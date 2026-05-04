import React from 'react'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export function Field({ label, children }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div>{children}</div>
    </div>
  )
}

export default Field
