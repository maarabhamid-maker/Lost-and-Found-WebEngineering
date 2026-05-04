import React from 'react'
import { Button } from '@/components/ui/button'

export function Pagination({ page = 1, total = 1, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => onChange(page - 1)} disabled={page <= 1}>Prev</Button>
      <div className="px-2">{page} / {total}</div>
      <Button onClick={() => onChange(page + 1)} disabled={page >= total}>Next</Button>
    </div>
  )
}

export default Pagination
