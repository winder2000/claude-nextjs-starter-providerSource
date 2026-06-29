# 🎯 Notion Invoice Share MVP PRD

## 🎯 핵심 정보

**목적**: 노션에 작성한 견적서를 클라이언트가 웹 URL로 열람하고 PDF로 다운로드할 수 있는 자동화된 공유 시스템 구축

**타겟 사용자**: 견적서를 자주 발행하는 프리랜서, 소규모 비즈니스 소유자 (디자이너, 개발자, 컨설턴트)

---

## 🚶 사용자 여정

```
1. 발행자 (Notion 사용자)
   ↓
   [Notion에서 견적서 작성 및 PublicToken 생성]
   ↓
2. 발행자
   ↓
   [클라이언트에게 공개 URL 전송]
   ↓
3. 클라이언트 (인증 불필요)
   ↓
   [공개 URL로 견적서 웹 페이지 열람 (토큰 기반)]
   ↓
4. 클라이언트
   ↓
   [PDF 다운로드 버튼 클릭]
   ↓
5. 시스템
   ↓
   [서버에서 PDF 생성 후 다운로드 제공]
   ↓
6. 완료: 클라이언트가 견적서 PDF 소유

분기:
- 유효한 토큰 → 견적서 상세 페이지 표시
- 유효하지 않은 토큰 → 오류 페이지 (404 Not Found)
```

---

## ⚡ 기능 명세

### 1. MVP 핵심 기능

| ID       | 기능명           | 설명                                                               | MVP 필수 이유                                      | 관련 페이지             |
| -------- | ---------------- | ------------------------------------------------------------------ | -------------------------------------------------- | ----------------------- |
| **F001** | 공개 견적서 열람 | Notion에서 가져온 견적서를 토큰 기반으로 웹에서 열람 (인증 불필요) | 서비스의 핵심 가치 - 클라이언트가 웹으로 확인 가능 | 견적서 공개 조회 페이지 |
| **F002** | PDF 다운로드     | 열람 중인 견적서를 PDF 파일로 다운로드 받기                        | 견적서 저장/인쇄 필요성 충족                       | 견적서 공개 조회 페이지 |
| **F010** | Notion API 연동  | Notion Database에서 견적서 데이터 자동 읽기 및 캐싱                | 노션 단일 소스 유지, 수동 데이터 입력 제거         | 견적서 공개 조회 페이지 |

### 2. MVP 필수 지원 기능

| ID       | 기능명              | 설명                                               | MVP 필수 이유                        | 관련 페이지             |
| -------- | ------------------- | -------------------------------------------------- | ------------------------------------ | ----------------------- |
| **F011** | 토큰 기반 접근 제어 | PublicToken으로 특정 견적서만 조회 가능하도록 검증 | 무단 접근 방지, 보안 기본 요구사항   | 견적서 공개 조회 페이지 |
| **F012** | 오류 처리           | 유효하지 않은 토큰 시 404 페이지 표시              | 사용자 경험 개선, 잘못된 URL 대응    | 오류 페이지             |
| **F013** | 랜딩 페이지         | 서비스 소개 및 사용 방법 안내                      | 초기 접근자 이해도 제고, 서비스 설명 | 랜딩 페이지             |

### 3. MVP 이후 기능 (제외)

- 발행자 회원가입/로그인 (인증 시스템)
- 견적서 편집 UI (Notion에서만 편집)
- 견적서 목록 조회 (발행자 대시보드)
- 결제/송금 기능
- 실시간 알림
- 댓글/피드백 기능
- 다국어 지원
- 고급 분석
- 토큰 만료 기능

---

## 📱 메뉴 구조

```
🌐 Notion Invoice Share 내비게이션 (공개 사용자)
├── 🏠 랜딩 페이지 (/)
│   └── 기능: F013 (서비스 소개, 사용 방법 안내)
│
└── 🔗 공개 견적서 (공개 링크 직접 접근)
    └── /invoice/view/[token]
        └── 기능: F001 (공개 견적서 열람), F002 (PDF 다운로드), F011 (토큰 검증), F010 (Notion API)

🚨 오류 페이지
└── /invoice/404 또는 /not-found
    └── 기능: F012 (유효하지 않은 토큰 처리)
```

### 메뉴 항목별 기능 매핑

| 메뉴        | 기능 ID                | 설명                          |
| ----------- | ---------------------- | ----------------------------- |
| 랜딩 페이지 | F013                   | 서비스 설명 및 사용 방법 제시 |
| 공개 견적서 | F001, F002, F010, F011 | 견적서 열람 및 PDF 다운로드   |
| 오류 페이지 | F012                   | 토큰 유효성 검증 실패 시 표시 |

---

## 📄 페이지별 상세 기능

### 1. 랜딩 페이지

> **구현 기능:** `F013` | **메뉴 위치:** 루트 `/`

| 항목            | 내용                                                                                                                                                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **역할**        | 서비스 소개 및 첫 방문자 안내 페이지 (인증 불필요)                                                                                                                                                                                                             |
| **진입 경로**   | 도메인 루트 직접 접근 또는 북마크 이동                                                                                                                                                                                                                         |
| **사용자 행동** | 서비스 설명 읽기 → 견적서 공유 방법 이해 → 개인 견적서 링크로 이동                                                                                                                                                                                             |
| **주요 기능**   | • 서비스 한 줄 소개 ("노션 견적서를 웹으로 공유하세요")<br>• 사용 방법 3단계 설명 (Notion 작성 → URL 생성 → 클라이언트 공유)<br>• 예시 견적서 링크 또는 테스트 토큰 제공<br>• 테마 토글 (라이트/다크 모드)<br>• **[예시 견적서 보기]** 버튼 (테스트 토큰 사용) |
| **다음 이동**   | 테스트 링크 클릭 → 견적서 공개 조회 페이지로 이동                                                                                                                                                                                                              |

### 2. 견적서 공개 조회 페이지

> **구현 기능:** `F001`, `F002`, `F010`, `F011` | **메뉴 위치:** `/invoice/view/[token]`

| 항목            | 내용                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **역할**        | 토큰으로 특정 견적서를 조회하고 PDF 다운로드할 수 있는 핵심 기능 페이지 (인증 불필요)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **진입 경로**   | 공개 URL 직접 방문 (예: https://domain.com/invoice/view/550e8400-e29b-41d4-a716-446655440000)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **사용자 행동** | URL 접속 → 토큰 검증 → 견적서 상세 표시 → PDF 다운로드 또는 인쇄                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **주요 기능**   | • **토큰 검증 (F011)**: 토큰이 Notion DB에 존재하는지 확인 후 해당 견적서 조회<br>• **Notion API 연동 (F010)**: @notionhq/client로 Notion Database 조회 및 페이지 데이터 가져오기<br>• **견적서 상세 표시 (F001)**: <br>&nbsp;&nbsp;- 클라이언트 정보 (이름, 연락처 등)<br>&nbsp;&nbsp;- 항목별 가격표 (항목명, 수량, 단가, 금액)<br>&nbsp;&nbsp;- 합계 섹션 (소계, 세금, 최종 금액)<br>&nbsp;&nbsp;- 견적서 생성일, 만료일<br>&nbsp;&nbsp;- 설명 또는 특수 조건사항<br>• **PDF 다운로드 버튼 (F002)**: @react-pdf/renderer로 서버사이드 PDF 생성 후 스트림 반환<br>• **테마 토글**: 라이트/다크 모드 전환<br>• **[뒤로 가기]** 또는 **[공유]** 버튼 |
| **다음 이동**   | • PDF 다운로드 → 파일 저장 (완료)<br>• 뒤로 가기 → 이전 페이지<br>• 공유 → 링크 복사 또는 SNS 공유                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### 3. 오류 페이지

> **구현 기능:** `F012` | **메뉴 위치:** `/invoice/not-found` 또는 `/404`

| 항목            | 내용                                                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **역할**        | 유효하지 않은 토큰 또는 존재하지 않는 견적서 접근 시 오류 안내                                                                                                                                                |
| **진입 경로**   | 잘못된 토큰으로 `/invoice/view/[invalid-token]` 접근 시 자동 리디렉션                                                                                                                                         |
| **사용자 행동** | 오류 메시지 확인 → 링크 재확인 또는 발행자 연락 → 랜딩 페이지로 돌아가기                                                                                                                                      |
| **주요 기능**   | • 404 Not Found 오류 메시지 ("요청한 견적서를 찾을 수 없습니다")<br>• 오류 원인 설명 (토큰 만료, 잘못된 링크, 권한 없음 등)<br>• **[랜딩 페이지로 돌아가기]** 버튼<br>• **[발행자에게 문의]** 버튼 (선택사항) |
| **다음 이동**   | 버튼 클릭 → 랜딩 페이지 또는 외부 연락처 이동                                                                                                                                                                 |

---

## 🗄️ 데이터 모델

### Notion Invoice 테이블 (Notion에서 관리)

| 필드명      | 타입         | 설명                                                         | 필수 여부      |
| ----------- | ------------ | ------------------------------------------------------------ | -------------- |
| Title       | Title        | 견적서 제목 (예: "2025-01-웹디자인 프로젝트")                | ✅ 필수        |
| Client      | Rich Text    | 클라이언트 이름                                              | ✅ 필수        |
| Amount      | Number       | 총액 (단위: KRW)                                             | ✅ 필수        |
| Status      | Select       | draft / sent / paid                                          | ✅ 필수        |
| DueDate     | Date         | 만료일                                                       | ✅ 필수        |
| Description | Rich Text    | 견적서 상세 내용 (항목별 가격, 조건사항 등)                  | ⭕ 선택        |
| PublicToken | Rich Text    | 공개 URL용 UUID (예: "550e8400-e29b-41d4-a716-446655440000") | ✅ 필수        |
| CreatedAt   | Created Time | 작성 일시                                                    | ⭕ Notion 자동 |

### TypeScript 타입 정의 (프로젝트 코드)

```typescript
// lib/types/invoice.ts

interface InvoiceData {
  id: string // Notion page ID
  title: string // 견적서 제목
  client: string // 클라이언트 이름
  amount: number // 총액
  status: 'draft' | 'sent' | 'paid'
  dueDate: string // ISO 8601 날짜
  description: string // 견적서 상세
  publicToken: string // 공개 토큰
  createdAt: string // 작성 일시 (ISO 8601)
  content?: string // Notion 블록 콘텐츠 (선택)
}

interface PDFRenderData {
  title: string
  client: string
  amount: number
  dueDate: string
  description: string
  createdAt: string
}
```

---

## 🛠️ 기술 스택 (최신 버전)

### 🎨 프론트엔드 프레임워크

- **Next.js 15.5.3** (App Router + Turbopack) - React 풀스택 프레임워크, 최고의 성능
- **React 19.1.0** - UI 라이브러리 (동시성 기능, 서버 컴포넌트)
- **TypeScript 5.x** - 타입 안전성 보장

### 🎨 스타일링 & UI

- **TailwindCSS v4** (설정파일 없는 새로운 엔진) - 유틸리티 CSS 프레임워크
- **shadcn/ui** (new-york style) - 고품질 React 컴포넌트 라이브러리
- **Radix UI** - 접근성 기반 UI 프리미티브
- **Lucide React ^0.543.0** - 아이콘 라이브러리
- **next-themes** - 라이트/다크 모드 테마 관리

### 📝 폼 & 검증

- **React Hook Form ^7.63.0** - 폼 상태 관리
- **Zod ^4.1.11** - 런타임 스키마 검증

### 🔌 Notion 연동

- **@notionhq/client ^2.x** - 공식 Notion API 클라이언트 (TypeScript 완벽 지원)

### 📄 PDF 생성

- **@react-pdf/renderer** - React 컴포넌트 기반 서버사이드 PDF 생성

### 🔔 알림 & 토스트

- **Sonner ^2.0.7** - 토스트 알림 라이브러리

### 🚀 배포 & 호스팅

- **Vercel** - Next.js 15 최적화 배포 플랫폼 (Turbopack 완벽 지원)

### 📦 패키지 관리

- **npm** - 의존성 관리

### 🛠️ 개발 도구

- **ESLint 9** - 코드 정적 분석
- **Prettier** - 코드 포맷팅
- **Husky ^9.1.7** - Git 훅 자동화
- **lint-staged** - 스테이징된 파일만 lint 검사

---

## 📦 추가 설치 패키지

### 설치 명령어

```bash
npm install @notionhq/client @react-pdf/renderer
```

### 패키지 상세

| 패키지                | 버전 | 용도                       | 특이사항                                                      |
| --------------------- | ---- | -------------------------- | ------------------------------------------------------------- |
| `@notionhq/client`    | ^2.x | Notion API 공식 클라이언트 | 서버 전용 (@notionhq/client는 Client Component에서 사용 불가) |
| `@react-pdf/renderer` | 최신 | React 컴포넌트로 PDF 생성  | 서버 또는 Route Handler에서만 사용                            |

### 환경변수 설정 (.env.local)

```bash
# Notion API 설정
NOTION_API_KEY=secret_xxxx                   # Notion 통합 API 키
NOTION_DATABASE_ID=xxxx                      # 견적서 데이터베이스 ID

# 앱 설정
NEXT_PUBLIC_APP_URL=http://localhost:3001    # 개발 환경
# NEXT_PUBLIC_APP_URL=https://your-domain.com  # 프로덕션
```

---

## 🎯 구현 체크리스트

### Phase 1: 기본 설정

- [ ] 패키지 설치: `npm install @notionhq/client @react-pdf/renderer`
- [ ] 환경변수 설정 (.env.local 생성)
- [ ] Notion 통합 생성 및 Database 연결

### Phase 2: 서버 로직

- [ ] `lib/notion.ts` 생성 - Notion 클라이언트 초기화
- [ ] `lib/notion-invoice.ts` 생성 - 견적서 조회 함수 구현
  - `getInvoiceByToken(token)` - 토큰으로 견적서 조회
  - `getInvoiceById(pageId)` - ID로 견적서 조회
  - `getInvoiceData(pageId)` - 전체 견적서 데이터 + 블록 내용
- [ ] `lib/types/invoice.ts` 생성 - TypeScript 타입 정의

### Phase 3: 페이지 구현

- [ ] `app/page.tsx` 수정 - 랜딩 페이지 (F013)
- [ ] `app/invoice/view/[token]/page.tsx` 생성 - 공개 조회 페이지 (F001, F002, F010, F011)
- [ ] `app/invoice/not-found.tsx` 생성 - 오류 페이지 (F012)

### Phase 4: 컴포넌트 구현

- [ ] `components/invoice-view.tsx` - 견적서 상세 표시 컴포넌트
- [ ] `components/invoice-pdf.tsx` - @react-pdf/renderer로 PDF 컴포넌트

### Phase 5: API 라우트

- [ ] `app/api/invoices/[token]/route.ts` - 토큰으로 견적서 JSON 반환
- [ ] `app/api/invoices/[id]/pdf/route.ts` - PDF 스트림 반환

### Phase 6: 테스트 & 배포

- [ ] 로컬 테스트 (npm run dev)
- [ ] 빌드 검증 (npm run build)
- [ ] 코드 품질 검사 (npm run check-all)
- [ ] Vercel 배포

---

## 💡 구현 팁

### Notion API 연동

```typescript
// lib/notion.ts 기본 구조
import { Client } from '@notionhq/client'

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

// lib/notion-invoice.ts
export async function getInvoiceByToken(token: string) {
  const result = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'PublicToken',
      rich_text: { equals: token },
    },
  })
  return result.results[0] ?? null
}
```

### PDF 생성 (Route Handler)

```typescript
// app/api/invoices/[id]/pdf/route.ts
import { renderToStream } from '@react-pdf/renderer'
import { InvoicePDF } from '@/components/invoice-pdf'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params  // Next.js 15: await params
  const data = await getInvoiceData(id)

  const stream = await renderToStream(<InvoicePDF data={data} />)

  return new Response(stream as unknown as ReadableStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="invoice-${id}.pdf"`,
    },
  })
}
```

### 토큰 생성 (Notion에서 수동 또는 자동화 스크립트)

```typescript
import { randomUUID } from 'crypto'

const token = randomUUID() // 예: '550e8400-e29b-41d4-a716-446655440000'
// Notion DB의 PublicToken 필드에 저장
```

---

## 📊 성공 기준

### MVP 완료 조건

- ✅ 공개 URL로 견적서 열람 가능 (인증 불필요)
- ✅ PDF 다운로드 기능 정상 작동
- ✅ Notion API로 실시간 데이터 동기화
- ✅ 토큰 검증으로 무단 접근 방지
- ✅ 라이트/다크 모드 지원
- ✅ 모바일 반응형 디자인
- ✅ Vercel 배포 성공

### 테스트 시나리오

1. **정상 토큰**: `/invoice/view/[valid-token]` 접근 → 견적서 정상 표시
2. **잘못된 토큰**: `/invoice/view/[invalid-token]` 접근 → 404 페이지 표시
3. **PDF 다운로드**: 견적서 페이지에서 [PDF 다운로드] 클릭 → 파일 다운로드
4. **테마 전환**: 라이트/다크 모드 토글 → 모든 페이지에 반영
5. **반응형**: 모바일/태블릿/데스크톱에서 레이아웃 정상 표시

---

## 🚀 배포 및 운영

### 프로덕션 배포 (Vercel)

```bash
# 환경변수 설정 (.env.production)
NOTION_API_KEY=[프로덕션 API 키]
NOTION_DATABASE_ID=[프로덕션 Database ID]
NEXT_PUBLIC_APP_URL=https://your-production-domain.com

# 배포
git push origin main  # Vercel 자동 배포
```

### 모니터링

- Vercel 대시보드에서 배포 상태 확인
- Notion API 호출 로그 모니터링
- PDF 생성 오류 추적

### 향후 개선사항 (MVP 이후)

1. 발행자 인증 시스템 (회원가입/로그인)
2. 견적서 편집 UI (Notion 대신 웹에서)
3. 견적서 목록 관리 대시보드
4. 토큰 만료 기능
5. 이메일 자동 발송
6. 결제 연동
7. 분석 대시보드
