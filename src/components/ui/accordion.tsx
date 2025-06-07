import * as React from "react"
import {
  Root,
  Item,
  Trigger,
  Content,
} from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Accordion = Root

const AccordionItem = React.forwardRef<React.ElementRef<typeof Item>, React.ComponentPropsWithoutRef<typeof Item>>(
  ({ className, ...props }, ref) => (
    <Item ref={ref} className={cn("border-b", className)} {...props} />
  )
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(
  ({ className, children, ...props }, ref) => (
    <Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </Trigger>
  )
)
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<React.ElementRef<typeof Content>, React.ComponentPropsWithoutRef<typeof Content>>(
  ({ className, children, ...props }, ref) => (
    <Content
      ref={ref}
      className={cn("data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm", className)}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </Content>
  )
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } 