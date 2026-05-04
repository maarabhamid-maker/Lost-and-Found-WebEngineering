import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { cn } from '@/lib/utils'

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Content ref={ref} className={cn('rounded-md border bg-popover p-2 shadow', className)} {...props} />
))
ContextMenuContent.displayName = 'ContextMenuContent'

export { ContextMenu, ContextMenuContent }
