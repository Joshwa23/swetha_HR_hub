import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "secondary", size?: "default" | "icon" | "lg" }>((
  { className, variant = "default", size = "default", ...props }, ref
) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50",
        size === "default" && "h-11 px-6 py-2",
        size === "icon" && "h-11 w-11",
        size === "lg" && "h-14 px-8 text-base",
        variant === "default" && "bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-200",
        variant === "secondary" && "bg-violet-50 text-violet-700 hover:bg-violet-100",
        variant === "outline" && "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
        variant === "ghost" && "hover:bg-slate-100 text-slate-700",
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
