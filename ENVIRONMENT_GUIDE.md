# 환경별 설정 가이드 (Local vs Vercel)

## 🎯 자동 감지 시스템

이 앱은 **자동으로** 현재 환경을 감지하고 적절한 저장소를 사용합니다:

| 환경 | 감지 방법 | 저장소 | 표시 |
|------|----------|--------|------|
| **로컬 개발** | localhost/127.0.0.1 | .env.local 있으면 Supabase, 없으면 localStorage | 📍 LOCAL |
| **Vercel 배포** | 프로덕션 도메인 | 환경변수 있으면 Supabase, 없으면 localStorage | 🌐 PROD |

---

## 🏠 로컬 개발 설정

### 방법 A: Supabase 연결 (클라우드 DB 사용)

```bash
# 1. .env.local 파일 생성
cat > .env.local << 'EOF'
VITE_SUPABASE_URL=https://ubylshiqilznifpmbkyu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
EOF

# 2. 개발 서버 실행
npm run dev

# 3. 화면 우측 하단에 확인
# 📍 LOCAL | SUPABASE (초록색)
```

### 방법 B: 완전 로컬 (localStorage만 사용)

```bash
# .env.local 없이 실행
npm run dev

# 화면 우측 하단에 확인
# 📍 LOCAL | LOCALSTORAGE (주황색)
```

---

## 🌐 Vercel 배포 설정

### 방법 A: Supabase 연결 (권장)

**Vercel Dashboard** → 프로젝트 → **Settings** → **Environment Variables**:

```
Key: VITE_SUPABASE_URL
Value: https://ubylshiqilznifpmbkyu.supabase.co

Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**저장 후 Redeploy**

### 방법 B: localStorage만 사용

환경변수 **설정하지 않음** → 자동으로 localStorage 모드로 전환

---

## 📊 저장소별 특징

| 기능 | Supabase | localStorage |
|------|----------|--------------|
| **데이터 영속성** | ✅ 영구 (클라우드) | ⚠️ 브라우저 캐시 의존 |
| **동기화** | ✅ 여러 기기 동기화 | ❌ 기기별 독립 |
| **속도** | ⚡ 네트워크 필요 | ⚡ 로컬 즉시 |
| **개발 편의성** | 인터넷 필요 | 오프라인 가능 |
| **데이터 용량** | 무제한 | 5-10MB 제한 |

---

## 🧪 모드 확인 방법

### 브라우저 Console에서:

```javascript
// 현재 모드 확인
console.log('Hostname:', window.location.hostname);
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL ? '설정됨' : '미설정');

// usePrompts 훅에서 반환되는 storageMode 확인
// 'supabase' 또는 'localStorage'
```

### 화면에서 확인:

우측 하단에 표시되는 배지:
```
📍 LOCAL | SUPABASE      ← 로컬 + 클라우드
📍 LOCAL | LOCALSTORAGE    ← 로컬 + 로컬
🌐 PROD | SUPABASE        ← 배포 + 클라우드
🌐 PROD | LOCALSTORAGE    ← 배포 + 로컬
```

---

## 🔧 문제 해결

### "Supabase credentials not found" (로컬)

**원인**: .env.local 파일 없음
**해결**:
```bash
cp .env.example .env.local
# 실제 값으로 수정
```

### "Supabase credentials not found" (Vercel)

**원인**: 환경변수 미설정
**해결**: Dashboard → Settings → Environment Variables 확인

### 데이터가 안 보여요

| 상황 | 확인 | 해결 |
|------|------|------|
| Supabase 모드 | Dashboard → Table Editor | 데이터 있는지 확인 |
| localStorage 모드 | 개발자도구 → Application → Local Storage | 데이터 있는지 확인 |
| 초기화 후 | 기본 1개만 보임 | migration.sql 실행 필요 |

---

## 🚀 권장 설정 조합

### 개발자용 (로컬)
```
📍 LOCAL | SUPABASE
```
- .env.local에 Supabase 설정
- 실제 데이터로 개발
- 배포 환경과 동일

### 테스트용 (로컬)
```
📍 LOCAL | LOCALSTORAGE  
```
- .env.local 없음
- 빠른 테스트
- 오프라인 개발 가능

### 프로덕션 (Vercel)
```
🌐 PROD | SUPABASE
```
- 환경변수 설정
- 실제 서비스
- 데이터 영구 보관

---

## 📁 관련 파일

- `.env.local` - 로컬 환경변수 (Git에 커밋 금지)
- `.env.example` - 환경변수 템플릿
- `src/components/DevModeIndicator.tsx` - 모드 표시 컴포넌트
- `src/hooks/usePrompts.ts` - 자동 모드 감지 및 전환

---

## 💡 팁

1. **로컬에서 Supabase 모드로 개발** → 배포와 동일한 환경
2. **인터넷 없을 때** → .env.local 임시 제거 → localStorage 모드
3. **데이터 백업** → Export 기능 사용 → JSON 파일 저장
4. **모드 전환** → 환경변수 유무만으로 자동 전환
