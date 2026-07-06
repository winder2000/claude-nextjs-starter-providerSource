import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout/container'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { InvoiceDetail } from '@/components/invoice/invoice-detail'
import { PdfDownloadButton } from '@/components/invoice/pdf-download-button'
import { ShareLinkButton } from '@/components/invoice/share-link-button'
import { getInvoiceByToken } from '@/lib/notion/get-invoice'

type InvoicePageProps = {
  params: Promise<{ token: string }>
}

export const metadata: Metadata = {
  title: '견적서 조회',
  description: 'Notion 기반 견적서를 조회하고 PDF로 다운로드하세요',
}

/**
 * 공개 견적서 조회 페이지 (F001, F002, F003, F004, F010, F011, F012)
 */
export default async function InvoicePage({ params }: InvoicePageProps) {
  const { token } = await params
  const invoice = await getInvoiceByToken(token)

  if (!invoice) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            <InvoiceDetail invoice={invoice} />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ShareLinkButton />
              <PdfDownloadButton token={invoice.publicToken} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
