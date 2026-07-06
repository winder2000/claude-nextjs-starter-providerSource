import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'

/**
 * 홈페이지
 *
 * 역할: 서비스 소개 및 공개 견적서 조회 페이지로의 진입점 (PRD 참조: docs/PRD.md)
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                견적서, 링크 하나로 간편하게 공유하세요
              </h1>
              <p className="text-muted-foreground mt-6 text-lg">
                Notion에서 작성한 견적서를 웹 링크로 바로 확인하고, PDF로
                다운로드할 수 있는 견적서 공유 서비스입니다.
              </p>
              <div className="mt-10">
                <Button size="lg" className="px-8 text-base" asChild>
                  <Link href="/invoice/demo">공개 견적서 조회 살펴보기</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
