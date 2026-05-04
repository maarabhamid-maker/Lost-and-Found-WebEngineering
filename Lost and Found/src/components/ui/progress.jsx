import React from 'react'

export function Progress({ value = 0, className, ...props }) {
  return (
    <div className={className} {...props}>
      <div style={{ width: `${value}%` }} className="h-2 bg-primary rounded" />
    </div>
  )
}

export default Progress
