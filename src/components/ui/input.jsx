import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type = "text", error, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex w-full rounded-lg border-2 bg-white px-4 py-3 text-base transition-all focus:outline-none focus:ring-2 font-medium",
      error
        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200 text-red-900"
        : "border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-100",
      className
    )}
    ref={ref}
    {...props}
  />
))

Input.displayName = "Input"

export { Input }
