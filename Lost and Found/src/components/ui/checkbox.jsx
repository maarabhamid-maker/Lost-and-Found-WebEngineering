import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={className} {...props} />
))

export default Checkbox
