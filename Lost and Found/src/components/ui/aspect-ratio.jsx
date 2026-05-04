import React from 'react'

export function AspectRatio({ ratio = 16/9, children, className }) {
  return (
    <div style={{ aspectRatio: ratio }} className={className}>
      {children}
    </div>
  )
}

export default AspectRatio
