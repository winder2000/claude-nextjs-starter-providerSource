'use client'

import { Link2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

/**
 * 견적서 링크 공유 버튼 (F004)
 * 현재 페이지 URL을 클립보드에 복사하고 토스트로 완료를 알린다.
 */
export function ShareLinkButton() {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('견적서 링크가 클립보드에 복사되었습니다.')
    } catch {
      toast.error('링크 복사에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <Button variant="outline" size="lg" onClick={handleShare}>
      <Link2 className="size-4" />
      링크 공유
    </Button>
  )
}
