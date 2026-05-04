import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils'

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Content ref={ref} className={cn('rounded-md border bg-popover p-2 shadow', className)} {...props} />
))
DropdownMenuContent.displayName = 'DropdownMenuContent'

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent }
