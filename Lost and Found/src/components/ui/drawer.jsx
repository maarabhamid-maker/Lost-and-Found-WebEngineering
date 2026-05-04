import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

const Drawer = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerContent = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Content ref={ref} className={cn('fixed z-50 bg-background p-4', className)} {...props} />
))
DrawerContent.displayName = 'DrawerContent'

export { Drawer, DrawerTrigger, DrawerContent }
