"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type LoadingSize = "sm" | "md" | "lg" | "xl";
type LoadingVariant = "default" | "primary" | "secondary";
type LoadingType = "spinner" | "dots" | "skeleton";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: LoadingType;
  text?: string;
  sizeVariant?: LoadingSize;
  fullScreen?: boolean;
  variant?: LoadingVariant;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({
    className,
    type = "spinner",
    text,
    sizeVariant = "md",
    fullScreen = false,
    variant = "default",
    ...props
  }, ref) => {
    const sizes = {
      sm: "h-4 w-4 border-2",
      md: "h-6 w-6 border-2",
      lg: "h-8 w-8 border-3",
      xl: "h-10 w-10 border-4",
    };

    const skeletonSizes = {
      sm: "h-4 w-20",
      md: "h-6 w-32",
      lg: "h-8 w-48",
      xl: "h-10 w-64",
    };

    const variants = {
      default: "border-muted-foreground/20 border-t-muted-foreground",
      primary: "border-primary/20 border-t-primary",
      secondary: "border-secondary/20 border-t-secondary",
    };

    const containerClasses = cn(
      "flex flex-col items-center justify-center gap-3",
      fullScreen && "fixed inset-0 bg-background/50 backdrop-blur-sm z-50"
    );

    const renderContent = () => {
      switch (type) {
        case "spinner":
          return (
            <div
              className={cn(
                "inline-block animate-spin rounded-full border-2 border-t-transparent",
                sizes[sizeVariant],
                variants[variant]
              )}
            />
          );
        case "dots":
          return (
            <div className="flex gap-1">
              {[0, 0.2, 0.4].map((delay, index) => (
                <div
                  key={index}
                  className={cn(
                    "animate-bounce rounded-full bg-current",
                    sizes[sizeVariant],
                    variants[variant]
                  )}
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          );
        case "skeleton":
          return (
            <div
              className={cn(
                "animate-pulse bg-muted rounded",
                skeletonSizes[sizeVariant]
              )}
            />
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn(containerClasses, className)}
        {...props}
      >
        {renderContent()}
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    );
  }
);
Loading.displayName = "Loading";

export { Loading };
