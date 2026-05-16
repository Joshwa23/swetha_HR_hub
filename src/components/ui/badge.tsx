import * as React from "react"
import { cn } from "../../lib/utils"

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" }) {
  return (
    <div className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      variant === "default" && "border-transparent bg-violet-600 text-white",
      variant === "secondary" && "border-transparent bg-violet-50 text-violet-700 hover:bg-violet-100",
      variant === "outline" && "border border-slate-200 text-slate-700",
      className
    )} {...props} />
  )
}
