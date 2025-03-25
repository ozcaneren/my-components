"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  variant?: "default" | "ghost" | "outline"
  sizeVariant?: "sm" | "md" | "lg" | "xl"
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className,
    label,
    error,
    variant = "default",
    sizeVariant = "md",
    ...props 
  }, ref) => {
    const variants = {
      default: "border border-input bg-background",
      ghost: "border-none bg-muted/50",
      outline: "border-2 border-input bg-transparent",
    }

    const sizes = {
      sm: "min-h-[80px] text-sm px-3 py-2",
      md: "min-h-[100px] text-base px-4 py-3",
      lg: "min-h-[120px] text-lg px-4 py-3",
      xl: "min-h-[140px] text-xl px-4 py-3",
    }

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        
        <textarea
          className={cn(
            // Base styles
            "w-full rounded-md ring-offset-background transition-colors",
            // Focus and disabled states
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Resize handling
            "resize-y",
            // Variant and size
            variants[variant],
            sizes[sizeVariant],
            // Placeholder and error states
            "placeholder:text-muted-foreground",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea } 