---
name: project-conventions
description: 프로젝트 코딩 표준 및 반복적으로 발견되는 위반 패턴
metadata:
  type: project
---

## 프로젝트 표준 스택 (CLAUDE.md 명시)

- Forms: React Hook Form + Zod + Server Actions
- Styling: TailwindCSS v4 + shadcn/ui (new-york style)
- 모든 응답/주석: 한국어
- 함수에 JSDoc 주석 추가 필수
- console.log 금지 → 적절한 로깅 라이브러리 사용

## 반복 발견된 위반 패턴

1. **폼 처리 안티패턴**: login-form.tsx와 signup-form.tsx가 React Hook Form + Zod 대신 useState + 수동 정규식 검증 사용. 이 패턴은 이 프로젝트에서 명시적으로 금지됨.
2. **JSDoc 주석 누락**: 모든 컴포넌트(Header, LoginForm, Container 등)에 JSDoc 없음. 반복적으로 발생하는 위반.
3. **SSR hydration 위험**: useMediaQuery를 반응형 레이아웃 전환에 사용 → CSS 미디어 쿼리(Tailwind `hidden md:flex`)로 대체 권장.
4. **미완성 컴포넌트**: signup-form.tsx는 form 태그, onSubmit, 상태관리 모두 없는 데드 코드 상태.

**Why:** 프로젝트가 스타터 템플릿으로서 올바른 패턴을 시연해야 하므로, 표준 스택을 따르지 않는 폼 구현은 학습자에게 잘못된 패턴을 전파할 위험이 있음.

**How to apply:** 새 폼 컴포넌트 리뷰 시 React Hook Form + Zod 사용 여부를 첫 번째로 확인.
