
# 프롬프트 저장소 (Prompt Dashboard)

AI 프롬프트를 관리하고 저장할 수 있는 웹 애플리케이션입니다. 브라우저에 데이터가 저장되어 새로고침해도 유지됩니다.

## 주요 기능

- ✅ 프롬프트 CRUD (생성, 읽기, 수정, 삭제)
- ✅ 카테고리별 필터링 (이미지 생성, 코딩, 글쓰기, 데이터 분석, 번역)
- ✅ 검색 기능 (제목, 설명, 카테고리, 태그)
- ✅ 프롬프트 복사 (클립보드)
- ✅ localStorage 데이터 지속성
- ✅ 반응형 디자인

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 배포 가이드 (Vercel)

### 1. GitHub 레포지토리 생성 및 푸시

```bash
# Git 초기화
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Prompt Dashboard"

# GitHub 레포지토리 생성 (GitHub 웹사이트에서)
# https://github.com/new

# 원격 저장소 연결 (사용자명/레포지토리명 수정 필요)
git remote add origin https://github.com/YOUR_USERNAME/prompt-dashboard.git

# 푸시
git push -u origin main
```

### 2. Vercel 배포

1. [Vercel](https://vercel.com)에 가입 (GitHub 계정으로 로그인 추천)
2. "Add New Project" 클릭
3. GitHub 레포지토리 선택
4. Framework Preset: **Vite** 선택
5. Build Command: `npm run build` (자동 감지)
6. Output Directory: `build` (자동 감지)
7. "Deploy" 클릭

### 3. 커스텀 도메인 연결 (선택)

1. Vercel Dashboard → 프로젝트 선택 → Settings → Domains
2. 원하는 도메인 입력 (예: `prompts.yourdomain.com`)
3. DNS 설정 안내에 따라 도메인 구매처에서 CNAME 레코드 추가
   - Type: CNAME
   - Name: prompts (또는 서브도메인)
   - Value: cname.vercel-dns.com

## 기술 스택

- React 18 + TypeScript
- Vite (빌드 도구)
- Tailwind CSS (스타일링)
- shadcn/ui (UI 컴포넌트)
- localStorage (데이터 저장)

## 라이선스

MIT
  