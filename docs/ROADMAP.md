# invoice-web (노션 기반 견적서 공유 시스템) 개발 로드맵

Notion에 입력한 견적서를 클라이언트가 웹 링크로 조회하고 PDF로 다운로드할 수 있는 견적서 공유 플랫폼

## 개요

invoice-web은 견적서를 발행하는 업체(발행자)와 이를 확인하는 고객(수신자)을 위한 "Notion을 단일 데이터 소스로 삼는 견적서 공유 서비스"로 다음 기능을 제공합니다:

- **Notion 견적서 조회 (F001, F011)**: Notion 데이터베이스에 저장된 견적서 데이터를 웹에서 실시간으로 표시
- **견적서 상세 정보 표시 (F002)**: 발주처, 품명, 수량, 단가, 합계, 유효기간 등을 테이블/카드 레이아웃으로 표시
- **PDF 다운로드 (F003)**: 화면에 표시된 견적서를 PDF 파일로 즉시 다운로드
- **견적서 링크 공유 (F004, F010)**: 견적서마다 고유 URL(publicToken)을 부여하고 클립보드 복사로 손쉽게 공유

> 인증/로그인, 견적서 작성·편집, 승인/거절, 이메일 발송, 결제 연동 등은 MVP 범위에서 제외됩니다 (`docs/PRD.md` 참조).

## 개발 워크플로우

1. **작업 계획**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
- 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- `/tasks` 디렉토리에 새 작업 파일 생성
- 명명 형식: `XXX-description.md` (예: `001-setup.md`)
- 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
- API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
- 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조

3. **작업 구현**

- 작업 파일의 명세서를 따름
- 기능과 기능성 구현
- API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
- 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행
- 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

- 로드맵에서 완료된 작업을 ✅로 표시

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 ✅

- Task 001: 프로젝트 구조 및 라우팅 설정 ✅ - 완료
  - ✅ Next.js App Router 기반 홈(`/`) 및 공개 견적서 조회(`/invoice/[token]`) 라우트 생성
  - ✅ 공통 레이아웃 컴포넌트(Header, Footer, Container) 재사용 구조 구성
  - ✅ 기존 스타터킷 랜딩 섹션(hero, features, cta) 제거하여 견적서 서비스 목적에 맞게 정리
  - ✅ PDF 다운로드용 Route Handler(`src/app/api/invoice/[token]/pdf/route.tsx`) 골격 생성
- Task 002: 타입 정의 및 인터페이스 설계 ✅ - 완료
  - ✅ `src/lib/types/invoice.ts`에 Invoice, InvoiceItem, CompanyInfo 타입 정의
  - ✅ Notion 연동 전 검증용 Mock 데이터(`src/lib/notion/mock-data.ts`, publicToken: `demo`) 작성
  - ✅ `src/lib/env.ts`에 NOTION_API_KEY, NOTION_INVOICE_DATABASE_ID 환경변수 스키마(optional) 추가

### Phase 2: UI/UX 완성 (더미 데이터 활용) ✅

- Task 003: 공통 컴포넌트 라이브러리 구현 ✅ - 완료
  - ✅ shadcn/ui `table.tsx` 컴포넌트 추가 (Table, TableHeader, TableBody, TableRow, TableCell 등)
  - ✅ 견적서 링크 공유 버튼(`share-link-button.tsx`) — 클립보드 복사 + Sonner 토스트 알림 (F004)
  - ✅ PDF 다운로드 버튼(`pdf-download-button.tsx`) — API 라우트로 연결된 다운로드 링크 (F003)
- Task 004: 공개 견적서 조회 페이지 UI 완성 (더미 데이터) ✅ - 완료
  - ✅ 견적서 상세 정보 컴포넌트(`invoice-detail.tsx`) — 발주처/발행자/품목 테이블/총액/비고 표시 (F002)
  - ✅ `/invoice/[token]` 페이지에서 mock 데이터(`demo` 토큰) 기반 전체 UI 렌더링 확인 (F001, F002, F010)
  - ✅ 홈페이지에 "공개 견적서 조회 살펴보기" 진입 버튼 연결 (`/invoice/demo`)
  - ✅ 반응형 클래스 적용 (`sm:`, `grid-cols-2` 등) — 다만 실제 기기별 시각 검증은 미완료 (F012, 부분 완료)

### Phase 3: 핵심 기능 구현

> **⚠️ 이 Phase의 모든 API 연동·비즈니스 로직 Task는 "구현 → Playwright MCP 테스트" 순서를 반드시 지킨다. 구현만 하고 테스트를 생략한 채 완료로 표시하지 않으며, 정상 케이스뿐 아니라 실패·엣지 케이스까지 꼼꼼히 검증한 뒤에만 완료 처리한다.**

- Task 005: Notion API 연동 및 데이터 조회 구현 - 우선순위
  - ✅ `@notionhq/client` 의존성 설치 및 `get-invoice.ts` 파일 골격 작성
  - ✅ 환경변수 미설정 시 mockInvoice로 폴백하는 개발 편의 로직 구현
  - `getInvoiceByToken`에서 Notion 데이터베이스 조회 후 페이지를 찾는 로직까지는 존재하나, **실제 Notion 페이지 프로퍼티 → Invoice 타입 매핑이 미구현 상태로 `return null` 처리됨** (`src/lib/notion/get-invoice.ts:46-47` TODO 주석 확인)
  - Notion 데이터베이스 스키마 확정 (발주처, 품명, 수량, 단가, 유효기간, publicToken 등 프로퍼티 타입 정의)
  - Notion 페이지 → Invoice/InvoiceItem 타입 매핑 함수 구현 (품목은 별도 데이터소스 또는 관계형 프로퍼티로 처리 방식 결정 필요)
  - 존재하지 않는 publicToken 조회 시 404(`notFound()`) 처리 검증
  - **## 테스트 체크리스트 (Playwright MCP)**
    - [ ] 정상 케이스: 실제 Notion 데이터 기반 `/invoice/[실제토큰]` 접속 → 상세 정보 정상 렌더링 확인
    - [ ] 실패 케이스: 존재하지 않는 publicToken으로 접속 시 404 페이지 노출 확인
    - [ ] 실패 케이스: `NOTION_API_KEY` 미설정/오류 상황에서 에러 처리 및 사용자 안내 메시지 확인
    - [ ] 엣지 케이스: 품목이 0개이거나 일부 프로퍼티(비고, 유효기간 등)가 비어있는 견적서 조회 시 레이아웃 깨짐 없이 렌더링되는지 확인
    - [ ] 엣지 케이스: 특수문자/긴 텍스트가 포함된 발주처명·품명이 정상 표시되는지 확인
    - 구현 완료 즉시 위 시나리오를 Playwright MCP로 실행하고, 전부 통과한 뒤에만 Task 완료로 표시
- Task 006: PDF 다운로드 기능 실데이터 검증
  - ✅ `@react-pdf/renderer` 기반 `InvoicePdfDocument` 컴포넌트 구현 (F003)
  - ✅ `/api/invoice/[token]/pdf` Route Handler에서 `renderToBuffer`로 PDF 생성 및 `Content-Disposition: attachment` 응답 구현
  - Notion 실데이터 연동 완료 후 실제 견적서로 PDF 다운로드 재검증 (현재는 mock 데이터 기준으로만 확인됨)
  - PDF 내 한글 폰트 깨짐 여부 확인 및 필요 시 커스텀 폰트 등록
  - **## 테스트 체크리스트 (Playwright MCP)**
    - [ ] 정상 케이스: PDF 다운로드 버튼 클릭 → 파일 다운로드 완료 및 파일명 규칙 확인
    - [ ] 정상 케이스: 다운로드된 PDF 내 한글(발주처명, 품명, 비고 등) 깨짐 없이 표시되는지 확인
    - [ ] 실패 케이스: 존재하지 않는 토큰의 PDF 라우트 직접 호출 시 적절한 에러 응답(404 등) 확인
    - [ ] 엣지 케이스: 품목 수가 많아 페이지가 넘어가는 견적서의 PDF 페이지네이션 정상 동작 확인
    - 구현 완료 즉시 위 시나리오를 Playwright MCP로 실행하고, 전부 통과한 뒤에만 Task 완료로 표시
- Task 007: 링크 공유 기능 검증 및 고유 URL 정책 확정
  - ✅ `ShareLinkButton`에서 `navigator.clipboard.writeText`로 현재 URL 복사 및 토스트 알림 구현 (F004)
  - ✅ `publicToken` 기반 동적 라우트(`/invoice/[token]`)로 고유 URL 메커니즘 구현 (F010)
  - publicToken 발급/관리 정책 확정 (Notion 프로퍼티에서 직접 관리 vs 별도 생성 로직)
  - 클립보드 API 미지원 브라우저(구형 환경) 대응 여부 확인
  - **## 테스트 체크리스트 (Playwright MCP)**
    - [ ] 정상 케이스: 링크 공유 버튼 클릭 → 클립보드 복사 → 성공 토스트 노출 확인
    - [ ] 실패 케이스: 클립보드 API 미지원/권한 거부 상황에서 에러 토스트 또는 대체 안내 노출 확인
    - [ ] 엣지 케이스: 복사된 클립보드 값이 실제 현재 페이지 URL과 정확히 일치하는지 검증
    - 구현 완료 즉시 위 시나리오를 Playwright MCP로 실행하고, 전부 통과한 뒤에만 Task 완료로 표시
- Task 007-1: 핵심 기능 통합 테스트
  - Notion 실데이터 조회 → 상세 정보 표시 → PDF 다운로드 → 링크 공유로 이어지는 전체 사용자 여정 Playwright MCP E2E 테스트
  - 존재하지 않는 견적서 토큰 접근 시 404 페이지 정상 노출 확인
  - Notion API 키 미설정/오류 상황에서의 에러 핸들링 확인
  - **## 테스트 체크리스트 (Playwright MCP)**
    - [ ] 전체 플로우: 견적서 링크 접속 → 상세 정보 확인 → PDF 다운로드 → 링크 공유까지 중단 없이 이어지는지 확인
    - [ ] 실패 케이스: 잘못된 토큰, API 오류, 네트워크 지연 등 각 실패 지점에서 사용자에게 적절한 피드백이 제공되는지 확인
    - [ ] 회귀 확인: Task 005~007에서 개별 통과한 시나리오가 통합 흐름에서도 동일하게 통과하는지 재검증
    - Phase 3의 모든 하위 Task 테스트가 통과한 이후에만 이 통합 테스트를 완료로 표시

### Phase 4: 고급 기능 및 최적화

- Task 008: 반응형 레이아웃 정밀 검증 및 접근성 보완 (F012)
  - 모바일(375px)/태블릿(768px)/데스크톱(1280px+) 기준 실제 화면 캡처 비교
  - 견적서 품목 테이블 모바일 가로 스크롤(overflow-x-auto) 동작 확인
  - 키보드 포커스 및 스크린리더 접근성(aria-label 등) 점검
  - Playwright MCP로 뷰포트별 스크린샷 비교 테스트 수행
- Task 009: 성능 최적화 및 배포 파이프라인 구축
  - Notion API 응답 캐싱 전략 검토 및 구현 (revalidate 주기 등)
  - PDF 생성 응답 속도 측정 및 필요 시 최적화
  - Vercel 배포 설정 및 환경변수(NOTION_API_KEY 등) 프로덕션 등록
  - **## 테스트 체크리스트 (Playwright MCP)**
    - [ ] 정상 케이스: 캐싱 적용 후 동일 견적서 재조회 시 최신 데이터 반영 여부(캐시 무효화 정책) 확인
    - [ ] 정상 케이스: 배포 후 프로덕션 URL에서 견적서 조회 → PDF 다운로드 → 링크 공유 전체 플로우 스모크 테스트
    - [ ] 실패 케이스: 프로덕션 환경변수 누락 시 에러가 사용자에게 노출되지 않고 안전하게 처리되는지 확인
    - 캐싱/배포 변경 직후 위 시나리오를 Playwright MCP로 실행하고, 전부 통과한 뒤에만 Task 완료로 표시
