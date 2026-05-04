import React from 'react'

export function Alert({ children, variant = 'default', className }) {
  return (
    <div className={`rounded-md p-3 ${className}`}>{children}</div>
  )
}

export default Alert
