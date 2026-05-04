import React from 'react'
import { Input } from '@/components/ui/input'

export function InputOTP({ value, onChange, length = 6, ...props }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <Input key={i} maxLength={1} value={value?.[i] || ''} onChange={(e) => onChange?.(e, i)} {...props} />
      ))}
    </div>
  )
}

export default InputOTP
