import React from 'react'
import { Separator } from '@/components/ui/separator'

export function Item({ children, className, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default Item
