# 로컬 서버 실행 및 데이터베이스 가이드

## ✅ Vercel 배포 수정 완료!

**Push 완료**: `405fec6` - Vercel config 수정  
**자동 재배포**: 1-2분 내에 `https://prompt-dashboard-zeta.vercel.app`에서 확인 가능

---

## 🖥️ 1. 로컬 서버에서 실행하기

### 방법 A: Node.js 개발 서버 (권장)

```bash
# 1. 프로젝트 폴더로 이동
cd /Users/wh.choi/Desktop/Code/promptDashBoard

# 2. 의존성 설치 (처음 한 번만)
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 접속
# http://localhost:3000
```

**특징**:
- hot reload (코드 수정 시 자동 새로고침)
- 소스맵 제공 (디버깅 용이)
- 빠른 빌드
- **데이터는 브라우저 localStorage에 저장**

### 방법 B: 정적 파일 서버 (프로덕션 테스트)

```bash
# 1. 프로덕션 빌드
npm run build

# 2. Python으로 정적 서버 실행 (Python 3)
cd build && python3 -m http.server 8080

# 또는 Node.js npx
npx serve build

# 3. 브라우저에서 접속
# http://localhost:8080
```

**특징**:
- 실제 배포 환경과 동일
- 빠른 로딩
- **데이터는 여전히 localStorage에 저장**

### 방법 C: Docker로 실행

```bash
# 1. Dockerfile 생성
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
EOF

# 2. Docker 이미지 빌드
docker build -t prompt-dashboard .

# 3. 컨테이너 실행
docker run -p 3000:3000 prompt-dashboard

# 4. 브라우저에서 접속
# http://localhost:3000
```

---

## 🗄️ 2. 데이터베이스 설명

### 현재 상태: localStorage 사용

```typescript
// src/hooks/usePrompts.ts
const STORAGE_KEY = 'prompt-dashboard-data';
// 데이터 저장 위치: 브라우저 localStorage
```

**왜 DB가 연결 안 되어 있나요?**

| 이유 | 설명 |
|------|------|
| **정적 사이트** | Vite + React는 정적 프론트엔드 → 백엔드 서버 없음 |
| **빠른 MVP** | localStorage로 프로토타입 완성, DB는 나중에 추가 가능 |
| **서버리스** | Vercel은 정적 호스팅 → 서버/DB 필요 없음 |

### localStorage의 한계

```
✅ 장점:
- 서버 없이 작동
- 빠른 읽기/쓰기
- 사용자별 독립 저장

❌ 단점:
- 브라우저 캐시 삭제 시 데이터 소실
- 최대 5-10MB 저장 제한
- 다른 기기/브라우저와 동기화 불가
- 다중 사용자 지원 불가
```

---

## 🔄 3. 데이터베이스 연결 옵션

### 옵션 A: 클라우드 DB (쉬움, 추천)

**Supabase (무료 티어)**
```typescript
// 1. Supabase 설치
npm install @supabase/supabase-js

// 2. 환경변수 설정 (.env)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

// 3. usePrompts.ts 수정
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// CRUD 함수 수정
const addPrompt = async (promptData) => {
  const { data, error } = await supabase
    .from('prompts')
    .insert([promptData])
    .select();
  return data[0];
};
```

**Firebase Firestore**
```typescript
npm install firebase

// Google Firebase 콘솔에서 프로젝트 생성
// Web 앱 등록 후 설정값 복사
```

**MongoDB Atlas**
```typescript
// 프록시 서버 필요 (백엔드 API)
// 또는 MongoDB Realm 사용
```

### 옵션 B: 로컬 DB (개발용)

**IndexedDB (브라우저 내장)**
```typescript
// localStorage 대용, 더 큰 용량
// dexie.js 라이브러리 추천
npm install dexie
```

**SQLite (로컬 파일)**
```typescript
// Electron 또는 Node.js 환경에서만
// 브라우저에서는 사용 불가
```

### 옵션 C: 자체 백엔드 서버 (완전한 제어)

**Node.js + Express + PostgreSQL**
```
프로젝트 구조:
promptDashBoard/
├── client/          # React 프론트엔드
├── server/          # Express 백엔드
│   ├── index.js
│   ├── routes/
│   └── models/
└── docker-compose.yml
```

**Express 서버 예시**:
```javascript
// server/index.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// API 엔드포인트
app.get('/api/prompts', async (req, res) => {
  const result = await pool.query('SELECT * FROM prompts');
  res.json(result.rows);
});

app.post('/api/prompts', async (req, res) => {
  const { title, content } = req.body;
  const result = await pool.query(
    'INSERT INTO prompts (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  res.json(result.rows[0]);
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

---

## 📊 4. 데이터베이스 비교표

| 방식 | 난이도 | 비용 | 용량 | 동기화 | 추천 상황 |
|------|--------|------|------|--------|-----------|
| **localStorage** | ⭐ | 무료 | 5-10MB | ❌ | 개인용, 프로토타입 |
| **Supabase** | ⭐⭐ | 무료~ | 무제한 | ✅ | 소규모 팀, 빠른 개발 |
| **Firebase** | ⭐⭐ | 무료~ | 무제한 | ✅ | Google 생태계 |
| **MongoDB Atlas** | ⭐⭐⭐ | 무료~ | 무제한 | ✅ | 복잡한 데이터 구조 |
| **자체 서버** | ⭐⭐⭐⭐ | 서버비용 | 무제한 | ✅ | 대규모, 완전한 제어 |

---

## 🚀 5. Supabase 연결 상세 가이드

### Step 1: Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com) 접속
2. GitHub로 로그인
3. **"New Project"** 클릭
4. 프로젝트 이름: `prompt-dashboard`
5. 데이터베이스 비밀번호 설정 (저장해두기!)
6. Region: `Seoul (Asia Pacific)` 선택
7. **"Create new project"** 클릭 (2-3분 소요)

### Step 2: 테이블 생성

```sql
-- SQL Editor에서 실행
CREATE TABLE prompts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  category_color TEXT,
  tags TEXT[],
  content TEXT NOT NULL,
  difficulty TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) 활성화
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- 자신의 데이터만 접근 가능하도록 설정
CREATE POLICY "Users can only access their own prompts" ON prompts
  FOR ALL USING (auth.uid() = user_id);
```

### Step 3: React 연동

```bash
npm install @supabase/supabase-js
```

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

```typescript
// src/hooks/usePrompts.ts (수정 버전)
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Prompt } from '../types/prompt';

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = async () => {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setPrompts(data);
    }
    setIsLoaded(true);
  };

  const addPrompt = async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data, error } = await supabase
      .from('prompts')
      .insert([promptData])
      .select();
    
    if (data) {
      setPrompts(prev => [data[0], ...prev]);
    }
  };

  // ... update, delete 등도 비슷하게 수정

  return { prompts, isLoaded, addPrompt, /* ... */ };
}
```

### Step 4: 환경변수 설정

```bash
# .env.local 파일 생성
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

```bash
# .gitignore에 추가 (보안)
.env.local
.env
```

---

## 🎯 추천 로드맵

### 지금 당장 (localStorage)
```
✅ 현재 상태로 사용 가능
✅ 개인용으로 충분
✅ 브라우저 캐시 주의
```

### 2주 후 (Supabase)
```
📅 데이터 백업/복원 기능 추가
📅 팀 공유 기능 필요시
📅 Supabase 무료 티어로 마이그레이션
```

### 3개월 후 (자체 서버)
```
📅 사용자 100명+ 되면
📅 고급 기능 필요시 (AI 통계, 팀 관리)
📅 AWS/GCP에 백엔드 구축
```

---

## ❓ 자주 묻는 질문

**Q: 지금 로컬에서만 쓰면 localStorage로 충분한가요?**
> ✅ 네! 개인용으로는 완벽합니다. 다만 브라우저 데이터 삭제 시 초기화됩니다.

**Q: 데이터를 영구 보관하려면?**
> Supabase나 Firebase로 30분 내에 연결 가능합니다.

**Q: 여러 기기에서 동기화하려면?**
> DB 연결이 필수입니다. Supabase 추천 (가장 쉬움).

**Q: 서버 없이 순수 클라우드만 쓰려면?**
> Vercel(프론트) + Supabase(DB) 조합이 가장 인기있습니다.

---

## 📞 다음 단계 결정

어떤 방식을 원하시나요?

| 선택 | 작업 시간 | 결과 |
|------|----------|------|
| **A** | 즉시 | 지금 상태로 localStorage 사용 |
| **B** | 30분 | Supabase 무료 티어 연결 |
| **C** | 2시간 | Express 백엔드 + PostgreSQL 구축 |

**원하는 옵션을 알려주세요!**