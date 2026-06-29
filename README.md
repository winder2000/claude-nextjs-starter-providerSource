# NextJS Starter - 모던 웹 스타터킷

Next.js 15.5.3 + React 19 기반 프로덕션 레벨의 모던 웹 애플리케이션 스타터 템플릿입니다.

## 🚀 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI + Lucide Icons
- **Development**: ESLint + Prettier + Husky + lint-staged

## 📋 사전 요구사항

- Node.js 18.17+ 또는 20+
- npm, yarn, pnpm, 또는 bun

## 🔧 설치 및 실행

### 1. 환경변수 설정

```bash
# .env.example을 참고하여 .env.local 파일 생성
cp .env.example .env.local
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 앱을 확인할 수 있습니다.

## 📦 주요 명령어

```bash
# 개발
npm run dev         # 개발 서버 실행 (Turbopack)

# 빌드 및 배포
npm run build       # 프로덕션 빌드
npm run start       # 프로덕션 빌드 실행

# 코드 품질
npm run lint        # ESLint 검사
npm run lint:fix    # ESLint 자동 수정
npm run format      # Prettier 포맷팅
npm run format:check # Prettier 포맷 검사
npm run typecheck   # TypeScript 타입 검사

# 통합 검사
npm run check-all   # 타입 검사 + lint + format 검사
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── login/page.tsx     # 로그인 페이지
│   └── signup/page.tsx    # 회원가입 페이지
├── components/            # React 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   ├── sections/          # 페이지 섹션
│   ├── navigation/        # 네비게이션
│   ├── ui/                # shadcn/ui 컴포넌트
│   └── providers/         # 프로바이더
├── lib/                   # 유틸리티 함수
│   ├── env.ts            # 환경변수 검증
│   ├── schemas.ts        # Zod 스키마
│   └── utils.ts          # 헬퍼 함수
└── config/               # 설정 파일
    └── navigation.ts     # 네비게이션 설정
```

## 🎨 주요 기능

- ✅ **반응형 디자인** - 모든 디바이스에서 최적화
- ✅ **다크모드** - next-themes를 사용한 테마 토글
- ✅ **폼 검증** - React Hook Form + Zod로 안전한 폼 처리
- ✅ **TypeScript** - 완전한 타입 안정성
- ✅ **SEO 최적화** - 메타데이터 자동 생성
- ✅ **성능 최적화** - 이미지 최적화, 코드 스플리팅
- ✅ **보안** - 보안 헤더, CSP, HSTS 설정

## 🔒 환경변수

### 개발 환경 (`.env.local`)

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 프로덕션 환경 (Vercel 등)

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

모든 사용 가능한 환경변수는 `.env.example`을 참고하세요.

## 📖 개발 가이드

자세한 개발 가이드는 `CLAUDE.md` 파일을 참고하세요:

- [프로젝트 구조](./docs/guides/project-structure.md)
- [컴포넌트 패턴](./docs/guides/component-patterns.md)
- [스타일링 가이드](./docs/guides/styling-guide.md)
- [폼 처리 가이드](./docs/guides/forms-react-hook-form.md)
- [Next.js 15 전문 가이드](./docs/guides/nextjs-15.md)

## 🚀 배포

### Vercel에 배포하기 (권장)

```bash
# 1. 리포지토리를 GitHub에 푸시
git push origin main

# 2. Vercel에서 리포지토리 연결
# https://vercel.com/new

# 3. 환경변수 설정
# NEXT_PUBLIC_APP_URL=https://your-domain.com
```

다른 배포 방법은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참고하세요.

## 📝 라이선스

MIT
