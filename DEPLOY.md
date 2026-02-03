# Vercel 배포 가이드

## 🚀 배포 준비 완료!

GitHub 레포지토리: https://github.com/chldngur89/promptDashboard

---

## Step 1: Vercel 가입 (2분)

### 1.1 Vercel 접속
1. [vercel.com](https://vercel.com) 접속
2. 오른쪽 상단 **"Sign Up"** 버튼 클릭

### 1.2 GitHub로 가입
1. **"Continue with GitHub"** 선택
2. GitHub 로그인 (이미 로그인되어 있으면 자동 진행)
3. 권한 요청 시 **"Authorize Vercel"** 클릭

---

## Step 2: 프로젝트 가져오기 (1분)

### 2.1 프로젝트 선택
1. Vercel Dashboard에서 **"Add New..."** → **"Project"** 클릭
2. GitHub Apps 섹션에서 **"promptDashboard"** 레포지토리 찾기
3. **"Import"** 버튼 클릭

### 2.2 설정 확인
**Configure Project** 페이지에서 다음 확인:

```
Framework Preset: Vite (자동 감지됨)
Build Command: npm run build (기본값)
Output Directory: build (기본값)
Install Command: npm install (기본값)
```

**Environment Variables:**
추가할 환경변수 없음 (기본 설정 사용)

---

## Step 3: 배포 (1분)

### 3.1 배포 시작
1. 설정 확인 후 **"Deploy"** 버튼 클릭
2. 빌드 진행 상황 확인 (1-2분 소요)
3. **"Congratulations!"** 화면이 나오면 성공!

### 3.2 배포 URL 확인
- 기본 URL: `https://prompt-dashboard-xxx.vercel.app`
  (xxx는 랜덤 문자열)
- **"Continue to Dashboard"** 클릭

---

## Step 4: 확인 및 테스트 (1분)

### 4.1 배포된 사이트 확인
1. **Visit** 버튼 클릭 또는 URL로 직접 접속
2. 프롬프트 목록이 정상 표시되는지 확인
3. 새로고침 시 데이터가 유지되는지 확인 (localStorage)

### 4.2 기능 테스트
- 검색 기능 동작 확인
- 카테고리 필터 동작 확인
- 새 프롬프트 추가 테스트
- 프롬프트 복사 버튼 테스트

---

## 🔄 자동 배포 설정

Vercel은 GitHub와 연동되어 자동 배포됩니다:

| 이벤트 | 동작 |
|--------|------|
| GitHub push | 자동 배포 트리거 |
| Pull Request | Preview URL 생성 |
| main 브랜치 merge | Production 업데이트 |

---

## 🌐 커스텀 도메인 연결 (선택)

### Step 5: 도메인 추가

#### 5.1 Vercel 설정
1. 프로젝트 Dashboard → **"Settings"** → **"Domains"**
2. **"Add"** 버튼 클릭
3. 원하는 도메인 입력 (예: `prompts.yourdomain.com`)
4. **"Add"** 버튼 클릭

#### 5.2 DNS 설정
Vercel이 제공하는 DNS 설정값을 복사:
```
Type: CNAME
Name: prompts (또는 원하는 서브도메인)
Value: cname.vercel-dns.com
```

#### 5.3 도메인 구매처에서 설정
가비아, Route53, GoDaddy 등에서 DNS 설정:
1. 도메인 관리 페이지 접속
2. DNS 설정 또는 레코드 관리 메뉴
3. CNAME 레코드 추가:
   - 호스트: `prompts` (또는 `@` 루트 도메인)
   - 값/타겟: `cname.vercel-dns.com`
   - TTL: 3600 (기본값)

#### 5.4 적용 대기
- DNS 전파는 최대 24시간 소요 (보통 5-10분)
- Vercel Dashboard에서 상태 확인 (Valid/Invalid)
- **Valid** 상태가 되면 `https://prompts.yourdomain.com`로 접속 가능

---

## 🛠️ 문제 해결

### Q: 프로젝트가 목록에 안 보여요
1. Vercel Dashboard → **"Add New..."** → **"Project"**
2. **"Adjust GitHub App Permissions"** 클릭
3. **"promptDashboard"** 레포지토리 선택
4. **"Save"** 클릭 후 새로고침

### Q: 빌드 실패 (Build Failed)
1. **"View Build Logs"** 클릭
2. 에러 메시지 확인
3. 로컬에서 `npm run build` 실행하여 동일 에러 재현
4. package.json의 dependencies 확인

### Q: 환경변수 필요한 경우
1. 프로젝트 Dashboard → **"Settings"** → **"Environment Variables"**
2. Key-Value 쌍 입력
3. **"Save"** 후 재배포

---

## 📋 배포 체크리스트

- [ ] Vercel 가입 완료 (GitHub 연동)
- [ ] promptDashboard 프로젝트 Import 완료
- [ ] Framework Preset: Vite 확인
- [ ] 첫 배포 성공
- [ ] 사이트 접속 확인
- [ ] localStorage 데이터 유지 확인
- [ ] (선택) 커스텀 도메인 추가
- [ ] (선택) DNS 설정 및 적용 확인

---

## 🎉 완료!

배포 완료 후 다음 URL에서 접속 가능:
- **Vercel URL**: `https://prompt-dashboard-xxx.vercel.app`
- **커스텀 도메인**: `https://prompts.yourdomain.com` (설정 시)

GitHub에 코드 push할 때마다 자동으로 업데이트됩니다!
