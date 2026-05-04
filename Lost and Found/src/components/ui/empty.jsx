import React from 'react'

export function Empty({ title, description }) {
  return (
    <div className="text-center py-12">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default Empty
