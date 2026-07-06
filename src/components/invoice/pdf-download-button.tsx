'use client'

import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'

/** 견적서 PDF 다운로드 버튼 (F003) */
export function PdfDownloadButton({ token }: { token: string }) {
  return (
    <Button size="lg" className="px-8" asChild>
      <a href={`/api/invoice/${token}/pdf`} download>
        <Download className="size-4" />
        PDF 다운로드
      </a>
    </Button>
  )
}
