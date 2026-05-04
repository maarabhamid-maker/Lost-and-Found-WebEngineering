import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from '@/lib/utils'

const ScrollArea = ScrollAreaPrimitive.Root

const ScrollViewport = ScrollAreaPrimitive.Viewport

const ScrollBar = React.forwardRef(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar ref={ref} className={cn('flex select-none touch-none p-0.5', className)} {...props} />
))
ScrollBar.displayName = 'ScrollBar'

export { ScrollArea, ScrollViewport, ScrollBar }
