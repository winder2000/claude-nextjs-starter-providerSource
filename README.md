# 노션 기반 견적서 공유 시스템 (Invoice Web)

Notion에서 작성한 견적서를 웹 링크로 조회하고 PDF로 다운로드할 수 있는 견적서 공유 서비스입니다. Next.js 15.5.3 + React 19 기반으로 구축되었습니다.

자세한 요구사항은 [`docs/PRD.md`](./docs/PRD.md)를 참고하세요.

## 🎯 프로젝트 소개

- **목적**: Notion에 입력한 견적서를 클라이언트가 웹 링크로 조회하고 PDF로 다운로드
- **사용자**: 견적서를 작성하는 업체(발행자)와 견적서를 확인하는 고객(수신자)
- **MVP 범위**: 인증/로그인, 작성/편집, 결제, 다국어 등은 제외 (Notion에서만 데이터 관리)

## 📄 주요 페이지

| 페이지                  | 경로               | 설명                                                               |
| ----------------------- | ------------------ | ------------------------------------------------------------------ |
| 홈페이지                | `/`                | 서비스 소개 및 공개 견적서 조회 페이지로의 진입점                  |
| 공개 견적서 조회 페이지 | `/invoice/[token]` | Notion 데이터 조회, 견적서 상세 정보 표시, PDF 다운로드, 링크 공유 |

## 🚀 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york 스타일)
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI + Lucide Icons
- **연동**: `@notionhq/client` (Notion API), `@react-pdf/renderer` (PDF 변환), `sonner` (토스트 알림)
- **Development**: ESLint + Prettier + Husky + lint-staged

## 📋 사전 요구사항

- Node.js 18.17+ 또는 20+
- npm, yarn, pnpm, 또는 bun
- Notion Integration 및 견적서 데이터베이스 (Notion API 연동 시 필요)

## 🔧 설치 및 실행

### 1. 환경변수 설정

```bash
# .env.example을 참고하여 .env.local 파일 생성
cp .env.example .env.local
```

`NOTION_API_KEY`, `NOTION_INVOICE_DATABASE_ID` 등 Notion 연동에 필요한 값을 채워주세요.

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3001](http://localhost:3001) 에서 앱을 확인할 수 있습니다.

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
├── app/                     # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지
│   └── invoice/[token]/    # 공개 견적서 조회 페이지 (Notion 연동)
├── components/              # React 컴포넌트
│   ├── layout/              # 레이아웃 컴포넌트 (Header, Footer, Container)
│   ├── navigation/           # 네비게이션
│   ├── ui/                  # shadcn/ui 컴포넌트
│   └── providers/           # 프로바이더 (ThemeProvider)
├── lib/                     # 유틸리티 함수
│   ├── env.ts               # 환경변수 검증 (Notion API 키 포함)
│   ├── schemas.ts            # Zod 스키마
│   └── utils.ts              # 헬퍼 함수
└── config/                  # 설정 파일
    └── navigation.ts        # 네비게이션 설정
```

## 🎨 주요 기능

- ✅ **Notion 견적서 조회** - Notion API로 견적서 데이터 실시간 로드
- ✅ **견적서 상세 정보 표시** - 발주처, 품명, 수량, 단가, 합계, 유효기간 등 표시
- ✅ **PDF 다운로드** - 견적서를 PDF 파일로 다운로드
- ✅ **견적서 링크 공유** - URL 클립보드 복사
- ✅ **반응형 디자인** - 모바일/태블릿/데스크톱 최적화
- ✅ **다크모드** - next-themes를 사용한 테마 토글

## 🔒 환경변수

### 개발 환경 (`.env.local`)

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Notion API 연동 (서버 전용)
NOTION_API_KEY=secret_xxx
NOTION_INVOICE_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

모든 사용 가능한 환경변수는 `.env.example`을 참고하세요.

## 📖 개발 가이드

자세한 개발 가이드는 `CLAUDE.md` 파일과 `docs/PRD.md`를 참고하세요.

## 📝 라이선스

MIT
