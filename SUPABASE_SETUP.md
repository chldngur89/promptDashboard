# Supabase 무료 티어 연결 가이드

## ✅ 코드 변경 완료!

**변경된 파일들:**
- `src/lib/supabase.ts` - Supabase 클라이언트 생성
- `src/hooks/usePrompts.ts` - Supabase/LocalStorage 하이브리드 지원
- `.env.example` - 환경변수 템플릿
- `package.json` - @supabase/supabase-js 추가

---

## 🚀 Supabase 설정 방법 (10분 소요)

### Step 1: Supabase 프로젝트 생성 (3분)

1. [supabase.com](https://supabase.com) 접속
2. GitHub로 로그인
3. **"New Project"** 클릭
4. 설정:
   - **Name**: `prompt-dashboard`
   - **Database Password**: 복잡한 비밀번호 설정 (저장해두세요!)
   - **Region**: `Seoul (Asia Pacific)` ← 중요!
5. **"Create new project"** (2-3분 소요)

### Step 2: 데이터베이스 테이블 생성 (3분)

프로젝트 대시보드 → **"SQL Editor"** → **"New Query"**

아래 SQL 복사해서 실행:

```sql
-- prompts 테이블 생성
CREATE TABLE prompts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  category_color TEXT,
  tags TEXT[],
  content TEXT NOT NULL,
  difficulty TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 추가 (검색 성능 향상)
CREATE INDEX idx_prompts_category ON prompts(category);
CREATE INDEX idx_prompts_created_at ON prompts(created_at DESC);

-- 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 활성화
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기/쓰기 가능 (간단한 설정)
CREATE POLICY "Allow all operations" ON prompts
  FOR ALL USING (true) WITH CHECK (true);
```

**Run** 버튼 클릭 → "Success. No rows returned"

### Step 3: 환경변수 설정 (2분)

1. Supabase 대시보드 → **"Project Settings"** → **"API"**
2. 아래 값들 복사:
   - **URL**: `https://xxxxxx.supabase.co`
   - **anon public**: `eyJhbG...` (긴 문자열)

3. 로컬에서 `.env.local` 파일 생성:

```bash
cd /Users/wh.choi/Desktop/Code/promptDashBoard
cp .env.example .env.local
```

4. `.env.local` 파일 수정:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: 로컬 테스트 (2분)

```bash
npm install  # Supabase 라이브러리 설치
npm run dev  # 개발 서버 실행
```

**브라우저**: http://localhost:3000

**확인 사항**:
- [ ] Console에 "Supabase credentials not found" 없음
- [ ] 프롬프트 목록이 표시됨
- [ ] 새 프롬프트 추가 후 새로고침해도 유지됨
- [ ] Supabase Table Editor에 데이터가 보임

---

## 🌐 Vercel 배포 시 환경변수 설정

### 방법 A: Vercel Dashboard (쉬움)

1. [vercel.com/dashboard](https://vercel.com/dashboard) 접속
2. `prompt-dashboard` 프로젝트 클릭
3. **"Settings"** → **"Environment Variables"**
4. 아래 변수 추가:
   - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbG...`
5. **"Save"** 클릭
6. **"Redeploy"** 클릭

### 방법 B: Vercel CLI

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 환경변수 설정
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# 재배포
vercel --prod
```

---

## 🔒 보안 팁

### ❌ 절대 하지 말 것
- `.env.local`을 Git에 커밋하지 마세요
- Supabase `service_role` key를 클라이언트에 노출하지 마세요

### ✅ 해야 할 것
```bash
# .gitignore에 추가되어 있음
cat .gitignore | grep env
```

```
# 결과
.env.local
.env
```

---

## 🧪 데이터 마이그레이션

기존 localStorage 데이터를 Supabase로 옮기려면:

```javascript
// 브라우저 개발자도구 (F12) → Console에서 실행

// 1. localStorage에서 데이터 추출
const data = JSON.parse(localStorage.getItem('prompt-dashboard-data'));
const prompts = data.prompts;

// 2. Supabase에 삽입 (하나씩)
const { createClient } = await import('@supabase/supabase-js');
const supabase = createClient('YOUR_URL', 'YOUR_ANON_KEY');

for (const prompt of prompts) {
  await supabase.from('prompts').insert({
    title: prompt.title,
    description: prompt.description,
    category: prompt.category,
    category_color: prompt.categoryColor,
    tags: prompt.tags,
    content: prompt.content,
    difficulty: prompt.difficulty,
    is_favorite: prompt.isFavorite || false
  });
}

console.log('Migration complete!');
```

---

## 📊 Supabase 무료 티어 한도

| 항목 | 한도 | 설명 |
|------|------|------|
| **Database** | 500MB | PostgreSQL 저장소 |
| **Auth** | 50,000 MAU | 월간 활성 사용자 |
| **API Calls** | 무제한 | soft limit 없음 |
| **Bandwidth** | 2GB | 월간 전송량 |

> 💡 개인용/소규모 팀용으로 충분합니다!

---

## 🆘 문제 해결

### Q: "Failed to fetch" 에러
```
원인: CORS 또는 네트워크 문제
해결: 
1. Supabase Dashboard → Authentication → URL 설정 확인
2. http://localhost:3000 추가
3. 배포 시 Vercel URL도 추가
```

### Q: "Invalid API key" 에러
```
원인: 환경변수 설정 오류
해결:
1. .env.local 파일 확인
2. VITE_ 접두사 확인
3. 서버 재시작 (npm run dev)
```

### Q: 데이터가 안 보여요
```
원인: RLS 정책 문제
해결:
1. SQL Editor에서 RLS POLICY 확인
2. 또는 임시로 RLS 비활성화:
   ALTER TABLE prompts DISABLE ROW LEVEL SECURITY;
```

---

## 🎉 완료 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] SQL로 테이블 생성
- [ ] .env.local에 환경변수 설정
- [ ] npm install 완료
- [ ] 로컬에서 데이터 저장 확인
- [ ] Vercel에 환경변수 설정
- [ ] 배포 사이트에서 데이터 확인

**축하합니다! 이제 클라우드 DB를 사용합니다!** 🚀
