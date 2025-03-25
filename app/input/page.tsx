"use client";

import { useState } from "react";
import { Search, Mail, Eye, EyeOff, Copy, Check } from "lucide-react";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Input } from "@/components/Input";
import { cn } from "@/lib/utils";

export default function InputPage() {
  const [activeTab, setActiveTab] = useState<"examples" | "code">("examples");
  const [isCopied, setIsCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputComponentCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel input kullanımı.",
      component: <Input placeholder="Basic input" />,
      code: `<Input placeholder="Basic input" />`,
    },
    {
      title: "Label ile Kullanım",
      description: "Label ile input kullanımı.",
      component: <Input label="Email" placeholder="Enter your email" />,
      code: `<Input label="Email" placeholder="Enter your email" />`,
    },
    {
      title: "Sol İkon",
      description: "Sol ikonu olan input örneği.",
      component: (
        <Input
          leftIcon={<Search className="h-4 w-4" />}
          placeholder="Search..."
        />
      ),
      code: `<Input leftIcon={<Search className="h-4 w-4" />} placeholder="Search..." />`,
    },
    {
      title: "Sağ İkon",
      description: "Sağ ikonu olan input örneği.",
      component: (
        <Input
          rightIcon={<Mail className="h-4 w-4" />}
          placeholder="Email address"
        />
      ),
      code: `<Input rightIcon={<Mail className="h-4 w-4" />} placeholder="Email address" />`,
    },
    {
      title: "Hata Durumu",
      description: "Hata mesajı ile input kullanımı.",
      component: (
        <Input
          error="This field is required"
          placeholder="Error state"
        />
      ),
      code: `<Input error="This field is required" placeholder="Error state" />`,
    },
    {
      title: "Ghost Varyant",
      description: "Ghost stilinde input kullanımı.",
      component: <Input variant="ghost" placeholder="Ghost input" />,
      code: `<Input variant="ghost" placeholder="Ghost input" />`,
    },
    {
      title: "Outline Varyant",
      description: "Outline stilinde input kullanımı.",
      component: <Input variant="outline" placeholder="Outline input" />,
      code: `<Input variant="outline" placeholder="Outline input" />`,
    },
    {
      title: "Small Boyut",
      description: "Küçük boyutlu input örneği.",
      component: <Input sizeVariant="sm" placeholder="Small input" />,
      code: `<Input sizeVariant="sm" placeholder="Small input" />`,
    },
    {
      title: "Large Boyut",
      description: "Büyük boyutlu input örneği.",
      component: <Input sizeVariant="lg" placeholder="Large input" />,
      code: `<Input sizeVariant="lg" placeholder="Large input" />`,
    },
    {
      title: "Password Input",
      description: "Şifre girişi için input örneği.",
      component: (
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />
      ),
      code: `<Input type="password" placeholder="Enter password" rightIcon={<Eye className="h-4 w-4" />} />`,
    },
  ];

  const tabs = [
    { id: "examples", label: "Örnekler" },
    { id: "code", label: "Komponent Kodu" },
  ];

  const inputComponentCode = `"use client"

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
              sizes[sizeVariant].replace(/px-\\d+/, ""),
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

export { Input }`;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Input Bileşeni
      </h1>

      <div className="flex space-x-1 rounded-lg bg-muted p-1 mb-8 max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "examples" | "code")}
            className={cn(
              "w-full rounded-md px-3 py-2 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "examples" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {showcases.map((showcase, index) => (
            <ComponentShowcase
              key={index}
              title={showcase.title}
              description={showcase.description}
              component={showcase.component}
              code={showcase.code}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-lg bg-muted/50 p-4">
            <div className="flex justify-end mb-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 rounded-md bg-muted">
              <code className="text-sm">{inputComponentCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}