import React from 'react'
import { cn } from '../../lib/utils'

export default function MainContainer({ children, className }: { children: React.ReactNode, className: string }) {
  return (
    <main className={cn(`responsive-px flex flex-col`, className)}>
      {children}
    </main>

  )
}
