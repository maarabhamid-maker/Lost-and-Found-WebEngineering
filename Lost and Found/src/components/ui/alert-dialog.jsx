import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@/lib/utils'

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Content ref={ref} className={cn('rounded-md border bg-popover p-4', className)} {...props} />
))
AlertDialogContent.displayName = 'AlertDialogContent'

export { AlertDialog, AlertDialogTrigger, AlertDialogContent }
