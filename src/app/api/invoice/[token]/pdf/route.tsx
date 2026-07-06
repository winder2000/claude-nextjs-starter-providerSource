import { renderToBuffer } from '@react-pdf/renderer'
import { NextRequest, NextResponse } from 'next/server'

import { getInvoiceByToken } from '@/lib/notion/get-invoice'
import { InvoicePdfDocument } from '@/lib/notion/invoice-pdf-document'

type RouteParams = {
  params: Promise<{ token: string }>
}

/** 견적서 PDF 다운로드 (F003) */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { token } = await params
  const invoice = await getInvoiceByToken(token)

  if (!invoice) {
    return NextResponse.json(
      { error: '견적서를 찾을 수 없습니다.' },
      { status: 404 }
    )
  }

  const buffer = await renderToBuffer(<InvoicePdfDocument invoice={invoice} />)

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${invoice.invoiceNumber}.pdf"`,
    },
  })
}
