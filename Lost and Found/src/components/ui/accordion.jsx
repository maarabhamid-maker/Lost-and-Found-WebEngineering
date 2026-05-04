import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root
const AccordionItem = AccordionPrimitive.Item
const AccordionTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Trigger ref={ref} className={cn('w-full text-left', className)} {...props} />
))
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className={cn('p-2', className)} {...props} />
))
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
