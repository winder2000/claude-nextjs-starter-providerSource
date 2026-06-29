# 🎯 Notion 기반 견적서 웹 서비스 MVP - PRD 생성 메타프롬프트

**이 프롬프트를 Claude에 입력하면 개발 시작 가능한 수준의 완성된 PRD가 생성됩니다.**

---

## 📋 프롬프트 지시사항

당신은 **1인 개발자를 위한 PRD(Product Requirements Document) 작성 전문가**입니다.

다음 서비스의 MVP PRD를 작성하세요:

### 🎯 서비스 요약

**서비스명**: Notion Invoice Share (노션 기반 견적서 공유 시스템)

**핵심 목적**: 노션에 작성한 견적서를 클라이언트가 웹 URL로 열람하고 PDF로 다운로드할 수 있게 하는 것

**타겟 사용자**: 견적서를 자주 발행하는 프리랜서, 소규모 비즈니스 소유자 (예: 디자이너, 개발자, 컨설턴트)

**핵심 문제**:

- 노션에 견적서를 작성하지만, 클라이언트와 공유하기 어려움
- 매번 PDF를 수동으로 내보내는 번거로움
- 클라이언트에게 간단한 공개 URL 형태로 공유하고 싶음

---

## 🔧 기술 스택 및 제약조건

### 현재 설치된 의존성 (변경 금지)

```
- Framework: Next.js 15.5.3 (App Router + Turbopack)
- Runtime: React 19.1.0 + TypeScript 5
- Styling: TailwindCSS v4 + shadcn/ui (new-york style)
- Forms: React Hook Form ^7.63.0 + Zod ^4.1.11 + Server Actions
- UI: Radix UI + Lucide React ^0.543.0
- Utils: Sonner ^2.0.7 (토스트), next-themes (테마)
- Dev: ESLint 9, Prettier, Husky, TypeScript
```

### 추가 설치 필수 패키지

```
- @notionhq/client (Notion API 클라이언트)
- @react-pdf/renderer (서버사이드 PDF 생성)
```

### 기술적 제약

- **Server Component 기본**: 인증 불필요한 공개 페이지도 Server Component로 구성
- **params/searchParams 처리**: 반드시 `await` 처리 필수 (Next.js 15 핵심 변경)
- **환경변수**: `NOTION_API_KEY`, `NOTION_DATABASE_ID` 필수
- **공개 URL 패턴**: 인증 없이 접근 가능 (토큰 기반 검증)

---

## ⚡ MVP 기능 범위

### ✅ MVP에 포함되는 기능

1. **공개 견적서 열람 (F001)**: Notion에서 가져온 견적서를 웹에서 열람 (토큰 기반, 인증 불필요)
2. **PDF 다운로드 (F002)**: 열람 중인 견적서를 PDF로 다운로드
3. **견적서 목록 조회 (F003)**: 발행자가 로그인 후 자신의 견적서 목록 확인
4. **Notion API 연동 (F010)**: Notion Database에서 견적서 데이터 자동 가져오기

### ❌ MVP에서 제외되는 기능

- 회원가입/로그인 (발행자 인증 미구현)
- 견적서 편집 UI (Notion에서만 편집)
- 결제/송금 기능
- 실시간 알림
- 댓글/피드백 기능
- 다국어 지원
- 고급 분석

---

## 📊 데이터 모델 (Notion Database 기준)

### Invoice 테이블 (Notion에서 관리)

| 필드명      | 타입         | 설명                                                         |
| ----------- | ------------ | ------------------------------------------------------------ |
| Title       | Title        | 견적서 제목 (예: "2025-01-웹디자인 프로젝트")                |
| Client      | Rich Text    | 클라이언트 이름                                              |
| Amount      | Number       | 총액 (단위: KRW)                                             |
| Status      | Select       | draft / sent / paid                                          |
| DueDate     | Date         | 만료일                                                       |
| Description | Rich Text    | 견적서 상세 내용                                             |
| PublicToken | Rich Text    | 공개 URL용 UUID (예: "550e8400-e29b-41d4-a716-446655440000") |
| CreatedAt   | Created Time | 작성 일시                                                    |

---

## 🎨 사용자 여정

```
1. 발행자: Notion에 견적서 작성
   ↓
2. 발행자: PublicToken 생성 및 URL 복사
   ↓
3. 발행자: 클라이언트에게 URL 전송 (예: https://your-domain.com/invoice/view/[token])
   ↓
4. 클라이언트: 인증 없이 공개 URL로 견적서 열람
   ↓
5. 클라이언트: [PDF 다운로드] 버튼으로 파일 저장
   ↓
6. 완료 → 클라이언트에게 견적서 공유 완료
```

---

## 📑 필수 페이지 및 라우트

### 공개 페이지 (인증 불필요)

1. **견적서 공개 조회 페이지** (`/invoice/view/[token]`)
   - 역할: 토큰으로 특정 견적서만 조회
   - 기능: 견적서 상세 표시 + [PDF 다운로드] 버튼

2. **랜딩/안내 페이지** (`/`)
   - 역할: 서비스 설명 및 접근 안내
   - 기능: 서비스 소개, 사용 방법 설명

### 관리 페이지 (향후 추가, MVP 제외)

- 발행자 대시보드 (견적서 목록, 토큰 관리)
- 설정 페이지

---

## 🔌 API 엔드포인트

### Route Handler (`app/api/`)

1. **`GET /api/invoices/[token]`** - 토큰으로 견적서 조회
   - 응답: Notion 페이지 데이터 (JSON)
   - 검증: 토큰 유효성 확인 (Notion DB 조회)

2. **`GET /api/invoices/[id]/pdf`** - PDF 생성 및 스트림
   - 응답: PDF 파일 (application/pdf)
   - 처리: @react-pdf/renderer로 서버사이드 생성

---

## 🌍 Notion API 연동

### 환경변수 (.env.local)

```bash
NOTION_API_KEY=secret_xxxx          # Notion 통합 API 키
NOTION_DATABASE_ID=xxxx              # 견적서 데이터베이스 ID
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 서버 유틸리티 (`lib/notion.ts`, `lib/notion-invoice.ts`)

- `notion` 클라이언트 초기화
- `getInvoiceByToken(token)` - 토큰으로 견적서 조회
- `getInvoiceById(pageId)` - ID로 견적서 조회
- `getInvoiceData(pageId)` - 전체 견적서 데이터 + 블록 내용 가져오기

---

## 🎨 UI/UX 스타일 가이드

### 설계 원칙

- **최소한의 디자인**: 견적서는 심플하고 깔끔하게 (프린트 친화적)
- **shadcn/ui 컴포넌트 사용**: Button, Card, Dialog, Separator 등
- **TailwindCSS v4**: 하드코딩 색상 제외, 시맨틱 변수만 사용 (bg-background, text-foreground 등)
- **다크 모드 지원**: next-themes로 자동 전환

### 핵심 컴포넌트

```
InvoiceView (공개 페이지)
├── Header (서비스 로고, 테마 토글)
├── InvoiceCard (견적서 상세 표시)
│   ├── 클라이언트 정보
│   ├── 항목별 금액 표
│   └── 합계 섹션
└── ActionButtons ([PDF 다운로드], [공유], [이전])
```

---

## 📋 출력 형식 지시

### 다음 섹션을 정확히 포함하여 PRD를 작성하세요

1. **🎯 핵심 정보**
   - 목적 (1줄)
   - 타겟 사용자 (1줄)

2. **🚶 사용자 여정**
   - 페이지 간 이동 흐름 다이어그램 (페이지 이름만 사용, URL 경로 제외)

3. **⚡ 기능 명세**
   - MVP 핵심 기능 테이블 (ID: F001, F002... / 기능명 / 설명 / 관련 페이지)
   - MVP 필수 지원 기능 (Notion API 연동, 인증 등)
   - MVP 이후 기능 (제외 목록)

4. **📱 메뉴 구조**
   - 공개 사용자 메뉴 (공개 견적서만 접근)
   - 발행자 메뉴 (향후 추가)

5. **📄 페이지별 상세 기능**
   - 각 페이지마다:
     - 역할
     - 진입 경로
     - 사용자 행동
     - 주요 기능 (구체적 기능 명시)
     - 구현 기능 ID (F001, F002 등)
     - 다음 이동 경로

6. **🗄️ 데이터 모델**
   - Notion Invoice 테이블
   - PDF 렌더링을 위한 추가 타입 정의

7. **🛠️ 기술 스택**
   - 프레임워크: Next.js 15.5.3, React 19, TypeScript 5
   - 스타일링: TailwindCSS v4, shadcn/ui
   - 폼/검증: React Hook Form, Zod
   - Notion 연동: @notionhq/client
   - PDF: @react-pdf/renderer
   - 배포: Vercel

8. **📦 추가 설치 패키지**
   ```bash
   npm install @notionhq/client @react-pdf/renderer
   ```

---

## ✅ PRD 작성 체크리스트

작성 완료 후 다음을 확인하세요:

- [ ] 기능 명세의 모든 기능(F001, F002...)이 페이지별 상세 기능에서 구현되어 있는가?
- [ ] 페이지별 상세 기능의 모든 페이지가 메뉴 구조에 포함되어 있는가?
- [ ] URL 경로가 포함되지 않았는가? (페이지 이름만 사용)
- [ ] 기술 스택이 최신 버전을 반영하고 있는가?
- [ ] 프로젝트 성공에 필요한 최소 기능만 포함되어 있는가?
- [ ] 모든 섹션이 정합성을 유지하고 있는가?

---

## 💡 참고 사항

### Notion API 연동 구현 팁

- Notion 통합을 생성하려면 notion.so에서 "Create Integration" 진행
- 데이터베이스에 통합을 "Connect"해야 API로 접근 가능
- `@notionhq/client`는 서버 환경에서만 사용 (Client Component 제외)

### PDF 생성 구현 팁

- `@react-pdf/renderer`는 일반 HTML/Tailwind 미지원 → 전용 StyleSheet API 사용
- Server Component 또는 Route Handler에서 `renderToStream()` 호출
- 응답 헤더에 `Content-Disposition: attachment` 설정으로 다운로드 유도

### 공개 URL 보안

- 토큰은 UUID 형식으로 예측 불가능하게 생성 (`crypto.randomUUID()`)
- Notion DB에서 토큰 일치 여부만 검증 (추가 인증 불필요)
- 토큰 만료 기능은 MVP 이후 추가 (현재는 무기한)

---

## 🎓 이 프롬프트 사용법

1. 이 전체 텍스트를 Claude에 입력
2. Claude가 완성된 PRD를 한국어로 출력
3. 출력된 PRD를 `docs/PRD.md`에 저장
4. 개발자가 이 PRD를 보고 즉시 개발 착수 가능

**핵심**: 이 메타프롬프트는 "PR
D를 생성하는 방법"이 아니라 "이 프롬프트 자체를 Claude에 입력하면 PRD가 나온다"는 의도입니다.
