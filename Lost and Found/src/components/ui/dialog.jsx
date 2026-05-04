import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Content ref={ref} className={cn('rounded-md border bg-popover p-4 shadow', className)} {...props} />
))
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5', className)} {...props} />
)

export { Dialog, DialogTrigger, DialogContent, DialogHeader }
