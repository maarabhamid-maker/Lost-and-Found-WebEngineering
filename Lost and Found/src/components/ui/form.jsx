import React from 'react'
import { Label } from '@/components/ui/label'

export function Form({ children, onSubmit, className }) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
