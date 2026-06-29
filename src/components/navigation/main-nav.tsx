'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/config/navigation'

/** 데스크톱 네비게이션 컴포넌트 */
export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6 lg:space-x-8">
      {NAV_ITEMS.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'hover:text-primary text-sm font-medium transition-colors',
            pathname === item.href ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
