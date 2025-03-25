"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronRightCircle,
  ArrowRight,
  Dot,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: "default" | "minimal" | "arrows" | "dots";
  separator?: React.ReactNode;
  showIcons?: boolean;
  className?: string;
}

const defaultSeparators = {
  default: <ChevronRight className="h-4 w-4" />,
  minimal: <span className="mx-2">/</span>,
  arrows: <ArrowRight className="h-4 w-4" />,
  dots: <Dot className="h-4 w-4" />,
};

export function Breadcrumb({
  items,
  variant = "default",
  separator,
  showIcons = false,
  className,
}: BreadcrumbProps) {
  const router = useRouter();
  const activeSeparator = separator || defaultSeparators[variant];

  const handleClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("relative", className)}>
      <ol
        className={cn(
          "flex items-center flex-wrap gap-2 text-sm",
          variant === "minimal" && "text-sm",
          variant === "arrows" && "font-medium"
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          const itemContent = (
            <>
              {showIcons && item.icon && (
                <span className="inline-flex shrink-0 items-center justify-center h-4 w-4 opacity-70">{item.icon}</span>
              )}
              <span className="inline-flex items-center">{item.label}</span>
            </>
          );

          return (
            <li
              key={item.label}
              className={cn(
                "flex items-center",
                variant === "minimal" && "text-muted-foreground",
                isLast && "text-foreground font-medium"
              )}
            >
              {item.href && !isLast ? (
                <>
                  <div
                    role="link"
                    tabIndex={0}
                    onClick={() => handleClick(item.href)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleClick(item.href);
                      }
                    }}
                    className={cn(
                      "inline-flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors duration-200 cursor-pointer",
                      variant === "default" && "text-muted-foreground",
                      variant === "minimal" && "text-muted-foreground hover:text-foreground",
                      variant === "arrows" && "text-muted-foreground font-normal",
                      variant === "dots" && "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {itemContent}
                  </div>
                  {!isLast && (
                    <span
                      className={cn(
                        "mx-2 text-muted-foreground/40",
                        variant === "minimal" && "mx-2 text-muted-foreground/40",
                        variant === "arrows" && "mx-1",
                        variant === "dots" && "mx-1"
                      )}
                    >
                      {activeSeparator}
                    </span>
                  )}
                </>
              ) : (
                <div className="inline-flex items-center gap-2 px-2 py-1">
                  {itemContent}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
