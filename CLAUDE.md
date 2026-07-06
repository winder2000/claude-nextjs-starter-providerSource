# 🤖 Claude Code 개발 지침

**invoice-web**은 Notion에 입력한 견적서를 클라이언트가 웹 링크로 조회하고 PDF로 다운로드할 수 있는 "노션 기반 견적서 공유 시스템 MVP"입니다. 이 프로젝트는 Next.js 15.5.3 + React 19 기반 스타터킷을 기반으로 구축되었습니다.

> 상세 요구사항은 [`@/docs/PRD.md`](./docs/PRD.md) 참조

## 🛠️ 핵심 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Forms**: React Hook Form ^7.63.0 + Zod ^4.1.11 + Server Actions
- **UI Components**: Radix UI + Lucide React ^0.543.0
- **Development**: ESLint 9 + Prettier + Husky ^9.1.7 + lint-staged

---

## ⚠️ 필수 코딩 규칙

### ❌ 절대 금지

- **Pages Router** 패턴 (`pages/` 디렉토리, `getServerSideProps` 등 사용 금지)
- **상대 경로 import** (`../../components` 금지 → 반드시 `@/components` 사용)
- **인라인 스타일** (`style={{ }}` 절대 사용 금지 → Tailwind 클래스 사용)
- **하드코딩 색상** (`bg-white`, `text-black` 금지 → `bg-background`, `text-foreground` 등 시맨틱 변수 사용)
- **params/searchParams 동기 접근** (반드시 `await` 처리 필수 - Next.js 15 핵심 변경)

### ✅ 반드시 준수

- `params`, `searchParams`, `cookies()`, `headers()`는 항상 `await`로 처리
- shadcn 색상 변수만 사용 (bg-background, text-foreground, text-muted-foreground, border 등)
- `cn()` 함수로 조건부 클래스 조합 (`@/lib/utils`에서 import)
- **Server Component 기본** → 상호작용이 필요할 때만 `'use client'` 추가
- **Named export** 사용 (페이지/레이아웃 컴포넌트만 default export)
- 파일 1개당 **300줄 이하** 유지 (초과 시 분리)

---

## 🏗️ 컴포넌트 아키텍처

### 컴포넌트 카테고리 (src/components/)

| 폴더          | 용도                    | 예시                               |
| ------------- | ----------------------- | ---------------------------------- |
| `ui/`         | shadcn/ui 원자 컴포넌트 | Button, Card, Input, Dialog, Form  |
| `layout/`     | 레이아웃 구조           | Header, Footer, Container, Sidebar |
| `navigation/` | 네비게이션              | MainNav, MobileNav, Breadcrumb     |
| `sections/`   | 페이지 섹션             | Hero, Features, CTA, Testimonials  |
| `providers/`  | Context Provider        | ThemeProvider                      |

### 아키텍처 원칙

- **Server Component 기본** — 데이터 페칭은 서버에서 처리
- **클라이언트 컴포넌트 최소화** — 상호작용이 필요한 부분만 `'use client'` 지정
- **단일 책임 원칙** — 1 컴포넌트 = 1 역할

---

## 🎨 스타일링 규칙

- **클래스 순서**: layout → size → typography → bg/border → effects → interaction
- **모바일 퍼스트**: `sm:` `md:` `lg:` `xl:` 순서로 반응형 작성
- **자동 정렬**: `prettier-plugin-tailwindcss` 플러그인이 클래스 자동 정렬
- **코드 스타일**: 세미콜론 ❌, 작은따옴표 ✓, 들여쓰기 2칸

---

## 📝 폼 처리 패턴

- **스택**: React Hook Form + Zod + Server Actions
- **상태 관리**: `useActionState` 훅으로 서버 응답 상태 관리
- **검증**: 클라이언트 Zod 검증 + 서버 Zod 검증 **이중 필수**
- **에러 처리**: 서버 에러 → `form.setError()`로 클라이언트에 반영

---

## 📁 파일 & 네이밍 컨벤션

| 항목        | 규칙                   | 예시                      |
| ----------- | ---------------------- | ------------------------- |
| 파일명      | `kebab-case`           | `my-component.tsx`        |
| 컴포넌트명  | `PascalCase`           | `MyComponent`             |
| 변수/함수   | `camelCase`            | `myVariable`, `getUser()` |
| import 순서 | 외부 → `@/` → 상대경로 | -                         |

---

## 🚀 Turbopack 개발 서버

- `npm run dev` 기본값으로 Turbopack 사용 (`--turbopack` 플래그)
- **빠른 핫 리로드**: 파일 변경 시 즉시 반영
- **지원 불가**: 동적 `require()`, 일부 Webpack 로더 (상단 에러 메시지 확인)

## 🎨 shadcn/ui 컴포넌트 추가

```bash
# 새 컴포넌트 추가
npx shadcn@latest add button

# 여러 컴포넌트 한번에 추가
npx shadcn@latest add card input button form label
```

- `components.json` 기본 설정: `new-york` 스타일, Server Components (RSC) 활성화
- 추가 경로: `@/components/ui/` (shadcn) vs `@/components/` (커스텀)
- 기본 색상: `neutral` (회색 기반, CSS 변수로 테마 적용)

## 📋 폼 검증 스키마 (Zod)

`@/lib/schemas.ts` 에 정의된 스키마 사용:

```typescript
// 로그인 폼
loginSchema: email (필수, 유효한 이메일), password (8자 이상), rememberMe (체크박스)

// 회원가입 폼
signupSchema: name (2자 이상), email, password (8자+), confirmPassword (일치 필수), terms (필수 동의)
```

- **클라이언트 검증**: React Hook Form + Zod (즉시 피드백)
- **서버 검증**: Server Actions에서 재검증 (필수)
- 커스텀 규칙: `refine()` 메서드로 조건부 검증 추가 가능

## 🔧 환경 변수 설정

1. `.env.local` 생성 (`.env.example` 기반):

   ```bash
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   ```

2. `@/lib/env.ts` 에서 Zod로 자동 검증
3. `NEXT_PUBLIC_*` 접두사: 클라이언트 코드에서 접근 가능

## 🚀 프로젝트 초기화

저장소 클론 후:

```bash
npm install                 # 의존성 설치
npm run prepare            # Husky 훅 설정
cp .env.example .env.local # 환경변수 초기화
npm run dev                # 개발 서버 시작 (http://localhost:3001)
npm run check-all          # 모든 검사 통과 확인
```

## 📁 주요 디렉토리 구조

```
src/
├── app/                  # Next.js App Router (페이지/레이아웃)
│   ├── login/           # 로그인 페이지
│   ├── signup/          # 회원가입 페이지
│   └── api/             # API 라우트 (Route Handlers)
├── components/
│   ├── ui/              # shadcn/ui 컴포넌트
│   ├── layout/          # Header, Footer, Container
│   ├── navigation/      # Nav, Breadcrumb
│   ├── sections/        # 페이지 섹션 (Hero, Features)
│   └── providers/       # Context Provider (ThemeProvider)
├── lib/
│   ├── schemas.ts       # Zod 폼 검증 스키마
│   ├── env.ts           # 환경변수 검증
│   ├── utils.ts         # 헬퍼 함수 (cn() 등)
│   └── types/           # 공유 타입 정의
└── config/
    └── navigation.ts    # 네비게이션 메뉴 설정
```

## 🎯 Next.js 15.5.3 핵심 변경사항

- **async params**: 페이지 컴포넌트에서 `params`, `searchParams` 는 Promise → 반드시 `await`
- **after() API**: 응답 후 비블로킹 작업 (분석, 알림 등)
- **unauthorized/forbidden**: 새 응답 헬퍼 함수
- **Turbopack**: 기본 번들러 (Webpack 대체)
- 상세: `@/docs/guides/nextjs-15.md`

## 📚 상세 개발 가이드

- **🗺️ 개발 로드맵**: `@/docs/ROADMAP.md`
- **📋 프로젝트 요구사항**: `@/docs/PRD.md`
- **📁 프로젝트 구조**: `@/docs/guides/project-structure.md`
- **🎨 스타일링 상세**: `@/docs/guides/styling-guide.md`
- **🧩 컴포넌트 패턴 상세**: `@/docs/guides/component-patterns.md`
- **⚡ Next.js 15.5.3 심화**: `@/docs/guides/nextjs-15.md`
- **📝 폼 처리 심화**: `@/docs/guides/forms-react-hook-form.md`

---

## 🛠️ 개발 워크플로우

### 로컬 개발 시작

```bash
npm run dev              # 개발 서버 시작 (Turbopack, 포트 3001)
# 브라우저: http://localhost:3001
```

- **핫 리로드**: 파일 저장 시 자동 새로고침
- **에러 오버레이**: 빌드 에러가 브라우저에 표시됨
- **서버 로그**: 콘솔에서 실시간 확인 가능

### 빌드 및 배포

```bash
npm run build       # 프로덕션 빌드 (최적화)
npm run start       # 프로덕션 서버 실행 (포트 3000)
```

## ⚡ 명령어 레퍼런스

### 개발

```bash
npm run dev         # 개발 서버 실행 (Turbopack)
npm run build       # 프로덕션 빌드
npm run start       # 프로덕션 서버 실행
npm run prepare     # Husky Git 훅 초기화
```

### 코드 품질

```bash
npm run typecheck         # TypeScript 타입 검사
npm run lint              # ESLint 검사
npm run lint:fix          # ESLint 자동 수정 (--fix 포함)
npm run format            # Prettier 포맷 적용
npm run format:check      # Prettier 포맷 검사 (CI용, 변경 없음)
npm run check-all         # typecheck + lint + format:check 통합 실행 (권장)
```

### UI 컴포넌트 & 환경

```bash
npx shadcn@latest add button     # 새 shadcn 컴포넌트 추가
npx shadcn@latest list            # 설치 가능한 컴포넌트 목록
```

---

## ✅ 작업 완료 체크리스트

```bash
npm run typecheck   # TypeScript 타입 검사 통과
npm run lint        # ESLint 검사 통과
npm run format      # Prettier 포맷 적용
npm run check-all   # 모든 검사 통과 (필수)
npm run build       # 프로덕션 빌드 성공 확인
```

---

## 🔌 .claude 폴더 확장

프로젝트에는 Claude Code 통합 설정이 포함되어 있습니다:

- **`.claude/agents/`**: 커스텀 AI 에이전트 (code-reviewer, nextjs-app-developer 등)
- **`.claude/commands/`**: 재사용 가능한 작업 명령어 (commit, branch, pr 등)
- **`.claude/hooks/`**: 자동화된 셸 스크립트 (포맷팅, 알림 등)
- **`.claude/settings.local.json`**: 로컬 권한 및 도구 설정

새 에이전트나 명령어를 추가하려면 해당 폴더 구조를 따르세요.

## 📦 주요 의존성

| 패키지          | 목적               | 버전     |
| --------------- | ------------------ | -------- |
| react           | UI 라이브러리      | 19.1.0   |
| next            | 프레임워크         | 15.5.3   |
| typescript      | 타입 안전성        | ^5       |
| tailwindcss     | 스타일링           | ^4       |
| react-hook-form | 폼 상태 관리       | ^7.63.0  |
| zod             | 스키마 검증        | ^4.1.11  |
| lucide-react    | 아이콘             | ^0.543.0 |
| @radix-ui/\*    | 접근성 컴포넌트    | 최신     |
| next-themes     | 테마 (라이트/다크) | 최신     |

devDependencies: ESLint, Prettier, Husky, TypeScript, Turbopack 번들러 포함

## 🌐 언어 설정

- 모든 응답과 출력은 **한국어**로 작성할 것
- 코드 주석은 한국어로 작성
- 커밋 메시지는 한국어로 작성
- 서브 에이전트 생성 시에도 반드시 한국어로 작성할 것
