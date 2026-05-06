import * as React from "react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    className={cn(
      "h-5 w-5 rounded border-2 border-slate-300 accent-emerald-600 cursor-pointer transition-colors focus:ring-2 focus:ring-emerald-200",
      className
    )}
    ref={ref}
    {...props}
  />
))

Checkbox.displayName = "Checkbox"

export { Checkbox }
