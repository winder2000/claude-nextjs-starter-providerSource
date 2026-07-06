# Task 005: Notion API 연동 및 데이터 조회 구현

> 로드맵 참조: `docs/ROADMAP.md` > Phase 3 > Task 005 (우선순위)
> 관련 기능: F001(Notion 견적서 조회), F011(Notion API 통합)

## 현재 상태

- ✅ `@notionhq/client` 의존성 설치 완료
- ✅ `getInvoiceByToken` 골격 존재 (`src/lib/notion/get-invoice.ts`)
- ✅ 환경변수 미설정 시 `mockInvoice`(publicToken: `demo`)로 폴백하는 개발 편의 로직 구현됨
- ✅ `publicToken`으로 데이터베이스 조회 → 페이지 검색까지는 구현됨
- ❌ **페이지 프로퍼티 → `Invoice`/`InvoiceItem` 타입 매핑 미구현** — `get-invoice.ts:46-47`에서 `return null` 처리 중 (TODO 주석)
- ❌ Notion 데이터베이스 스키마 미확정
- ❌ `.env.local`에 실제 `NOTION_API_KEY` / `NOTION_INVOICE_DATABASE_ID` 미설정 (Notion 워크스페이스 준비 전)

## 전제 및 가정 (사용자 확인됨)

- 실제 Notion 데이터베이스가 아직 준비되지 않은 상태 → **합리적인 기본 스키마를 가정**하고 설계하며, 실제 연동 시점에 조정한다.
- 품목(items)은 **관계형 DB로 분리하지 않고, 단일 페이지 내 Rich Text 프로퍼티에 JSON 문자열로 저장**하는 방식으로 가정한다. (Notion 페이지 1개 = 견적서 1건, 품목 배열은 JSON 직렬화)

## Notion 데이터베이스 스키마 (가정안)

| 프로퍼티명            | Notion 타입 | Invoice 필드 매핑            | 비고                                   |
| --------------------- | ----------- | ---------------------------- | -------------------------------------- |
| Name                  | Title       | `invoiceNumber`              | Notion 필수 Title 프로퍼티 활용        |
| clientName            | Rich Text   | `clientName`                 | 발주처명                               |
| invoiceDate           | Date        | `invoiceDate`                | ISO 문자열로 변환                      |
| validUntil            | Date        | `validUntil`                 | ISO 문자열로 변환                      |
| itemsJson             | Rich Text   | `items` (파싱)               | `InvoiceItem[]`를 JSON 문자열로 저장   |
| totalAmount           | Number      | `totalAmount`                | -                                      |
| currency              | Select      | `currency`                   | 기본값 `KRW`                           |
| notes                 | Rich Text   | `notes`                      | 빈 값 허용                             |
| companyName           | Rich Text   | `companyInfo.name`           | 발행자 회사명                          |
| companyRepresentative | Rich Text   | `companyInfo.representative` | -                                      |
| companyAddress        | Rich Text   | `companyInfo.address`        | -                                      |
| companyContact        | Rich Text   | `companyInfo.contact`        | -                                      |
| publicToken           | Rich Text   | `publicToken`                | 공개 URL 조회 키 (기존 필터 조건 유지) |

> ⚠️ 실제 Notion 데이터베이스 준비 시 위 프로퍼티명/타입을 실제 값으로 맞춰 조정한다 (환경 설정 단계에서 재검증 필요).

## 관련 파일

- `src/lib/notion/get-invoice.ts` — 매핑 함수 구현 대상
- `src/lib/types/invoice.ts` — 기존 타입 정의 (수정 불필요, 매핑 결과가 이 타입을 만족해야 함)
- `src/lib/notion/mock-data.ts` — 매핑 결과 검증 시 참고용 mock 구조
- `src/lib/env.ts` — 환경변수 스키마 (이미 optional로 정의됨, 수정 불필요)
- `.env.example` / `.env.local` — 실제 연동 시 값 입력

## 구현 단계

1. **Notion 페이지 → Invoice 매핑 함수 작성** (`mapPageToInvoice` 또는 유사 이름, `get-invoice.ts` 내부 또는 별도 파일 `src/lib/notion/map-invoice.ts`)
   - Notion 프로퍼티 접근 시 `isFullPage` 가드 적용
   - 각 프로퍼티 타입(`title`, `rich_text`, `number`, `date`, `select`)에서 안전하게 값 추출하는 헬퍼 함수 작성
   - `itemsJson` 프로퍼티를 `JSON.parse`하여 `InvoiceItem[]`로 변환 (파싱 실패 시 빈 배열로 폴백 + 콘솔 경고)
2. **`getInvoiceByToken` 수정**
   - 기존 `return null` 자리에 매핑 함수 호출 결과 반환
   - 매핑 중 필수 필드 누락/파싱 에러 발생 시 에러를 삼키지 않고 로그 남긴 후 `null` 반환 (404 처리로 이어지도록)
3. **404 처리 검증**
   - 존재하지 않는 `publicToken` 조회 시 `getInvoiceByToken`이 `null`을 반환 → `invoice/[token]/page.tsx`의 `notFound()` 호출 확인
4. **엣지 케이스 방어 로직**
   - `items`가 빈 배열이거나 `notes`/`validUntil` 등이 빈 문자열인 경우에도 타입 검증(Zod) 또는 기본값 처리로 렌더링 깨짐 방지
   - 특수문자/긴 텍스트 포함 시 이스케이프 처리 불필요 여부 확인 (React 자동 이스케이프로 충분한지 검토)
5. **환경변수 문서화 갱신**
   - `.env.example`에 위 스키마 가정안을 주석으로 추가 (실제 프로퍼티명 확정 시 갱신 예정임을 명시)

## 수락 기준

- `NOTION_API_KEY`/`NOTION_INVOICE_DATABASE_ID` 설정 시 실제 Notion 페이지 데이터가 `Invoice` 타입으로 정상 매핑되어 반환된다.
- 존재하지 않는 `publicToken` 조회 시 `null` 반환 → 페이지 레벨에서 404(`notFound()`) 처리된다.
- 환경변수 미설정 시 기존처럼 `mockInvoice` 폴백 동작이 그대로 유지된다 (회귀 없음).
- 품목 파싱 실패, 일부 프로퍼티 누락 등 비정상 데이터에서도 앱이 크래시 없이 안전하게 처리된다.

## 테스트 체크리스트 (Playwright MCP)

- [ ] 정상 케이스: 실제 Notion 데이터 기반 `/invoice/[실제토큰]` 접속 → 상세 정보 정상 렌더링 확인
- [ ] 실패 케이스: 존재하지 않는 publicToken으로 접속 시 404 페이지 노출 확인
- [ ] 실패 케이스: `NOTION_API_KEY` 미설정/오류 상황에서 에러 처리 및 사용자 안내 메시지 확인 (기존 mock 폴백 회귀 확인 포함)
- [ ] 엣지 케이스: 품목이 0개이거나 일부 프로퍼티(비고, 유효기간 등)가 비어있는 견적서 조회 시 레이아웃 깨짐 없이 렌더링되는지 확인
- [ ] 엣지 케이스: 특수문자/긴 텍스트가 포함된 발주처명·품명이 정상 표시되는지 확인
- 구현 완료 즉시 위 시나리오를 Playwright MCP로 실행하고, 전부 통과한 뒤에만 Task 완료로 표시

## 최종 구현 결과 (완료)

> 사용자 요청에 따라 최초 가정안(단일 페이지 + itemsJson)에서 **Invoice/Items 2-DB 관계형 구조**로 최종 변경하여 구현 완료.

- Notion API(`databases.create` + `dataSources.update`)로 `Invoice`, `Items` 데이터베이스를 실제로 생성함
  - `Invoice` DB: `Name`(Title), `clientName`/`notes`/`companyName` 등(Rich Text), `invoiceDate`/`validUntil`(Date), `totalAmount`(Number), `currency`(Select), `publicToken`(Rich Text), `Items`(Relation → Items DB)
  - `Items` DB: `Name`(Title, 품명), `quantity`/`unitPrice`/`amount`(Number), `unit`(Rich Text), `Related to Invoice (Items)`(역방향 Relation, 자동 생성)
- `src/lib/notion/map-invoice.ts`: `mapPageToInvoice(page, itemPages)`, `mapPageToInvoiceItem(page)`, `getRelatedItemPageIds(page)` 구현
- `src/lib/notion/get-invoice.ts`: Invoice 페이지 조회 → `Items` Relation ID 추출 → 품목 페이지 병렬 조회(`Promise.all` + `pages.retrieve`) → 매핑
- `src/lib/env.ts`: `NOTION_ITEMS_DATABASE_ID` 환경변수 추가
- 실제 Notion 워크스페이스에 테스트 데이터(견적서 `INV-2026-TEST-001`, publicToken `real-test-token-001`, 품목 2건 — 특수문자 포함)를 생성해 Playwright로 전체 플로우(상세 렌더링, PDF 다운로드, 404) 검증 완료

## 주의사항

- 실제 Notion 데이터베이스의 프로퍼티명/타입을 바꾸는 경우 `map-invoice.ts`의 `NOTION_PROPERTY`/`NOTION_ITEM_PROPERTY` 상수만 조정하면 된다.
- 워크스페이스에 테스트용 견적서/품목 페이지가 남아있다(`real-test-token-001`). 필요 시 Notion에서 직접 삭제한다.
