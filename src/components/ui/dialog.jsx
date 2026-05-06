import * as React from "react"
import { cn } from "@/lib/utils"

const Dialog = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div className="relative z-50 bg-white rounded-2xl shadow-2xl max-h-screen overflow-y-auto border border-slate-100">
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ className, children, ...props }) => (
  <div className={cn("p-8 w-full max-w-md", className)} {...props}>
    {children}
  </div>
)

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex justify-between items-center mb-6 pb-4 border-b border-slate-200", className)} {...props} />
)

const DialogTitle = ({ className, ...props }) => (
  <h2 className={cn("text-2xl font-bold text-slate-900", className)} {...props} />
)

const DialogClose = ({ onClick, className, ...props }) => (
  <button
    onClick={onClick}
    className={cn(
      "p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-700 text-2xl leading-none",
      className
    )}
    {...props}
  >
    ×
  </button>
)

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose }
