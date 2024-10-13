import React from 'react'
import { cn } from '../../lib/utils'

export default function Title({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <h2 className={cn("text-3xl sm:text-4xl font-bold text-pretty", className)}>
      {children}
    </h2>
  )
}
