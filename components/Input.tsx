"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: "default" | "ghost" | "outline"
  sizeVariant?: "sm" | "md" | "lg"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    type = "text",
    label,
    error,
    leftIcon,
    rightIcon,
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
      sm: "h-8 text-sm px-2",
      md: "h-10 text-base px-3",
      lg: "h-12 text-lg px-4",
    }

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              // Base styles
              "w-full rounded-md ring-offset-background transition-colors",
              // Input padding based on icon presence
              leftIcon ? "pl-10" : "pl-3",
              rightIcon ? "pr-10" : "pr-3",
              // Focus and disabled states
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              // File input styles
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              // Variant and size
              variants[variant],
              // Remove default padding from sizes when icons are present
              sizes[sizeVariant].replace(/px-\d+/, ""),
              // Placeholder and error states
              "placeholder:text-muted-foreground",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
