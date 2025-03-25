"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Textarea } from "@/components/Textarea";
import { cn } from "@/lib/utils";

export default function TextareaPage() {
  const [activeTab, setActiveTab] = useState<"examples" | "code">("examples");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textareaComponentCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel textarea kullanımı.",
      component: <Textarea placeholder="Enter your message" />,
      code: `<Textarea placeholder="Enter your message" />`,
    },
    {
      title: "Label ile Kullanım",
      description: "Label ile textarea kullanımı.",
      component: (
        <Textarea
          label="Message"
          placeholder="Type your message here"
        />
      ),
      code: `<Textarea label="Message" placeholder="Type your message here" />`,
    },
    {
      title: "Hata Durumu",
      description: "Hata mesajı ile textarea kullanımı.",
      component: (
        <Textarea
          error="This field is required"
          placeholder="Error state"
        />
      ),
      code: `<Textarea error="This field is required" placeholder="Error state" />`,
    },
    {
      title: "Ghost Varyant",
      description: "Ghost stilinde textarea kullanımı.",
      component: (
        <Textarea
          variant="ghost"
          placeholder="Ghost textarea"
        />
      ),
      code: `<Textarea variant="ghost" placeholder="Ghost textarea" />`,
    },
    {
      title: "Outline Varyant",
      description: "Outline stilinde textarea kullanımı.",
      component: (
        <Textarea
          variant="outline"
          placeholder="Outline textarea"
        />
      ),
      code: `<Textarea variant="outline" placeholder="Outline textarea" />`,
    },
    {
      title: "Small Boyut",
      description: "Küçük boyutlu textarea örneği.",
      component: (
        <Textarea
          sizeVariant="sm"
          placeholder="Small textarea"
        />
      ),
      code: `<Textarea sizeVariant="sm" placeholder="Small textarea" />`,
    },
    {
      title: "Large Boyut",
      description: "Büyük boyutlu textarea örneği.",
      component: (
        <Textarea
          sizeVariant="lg"
          placeholder="Large textarea"
        />
      ),
      code: `<Textarea sizeVariant="lg" placeholder="Large textarea" />`,
    },
    {
      title: "XLarge Boyut",
      description: "Extra büyük boyutlu textarea örneği.",
      component: (
        <Textarea
          sizeVariant="xl"
          placeholder="XLarge textarea"
        />
      ),
      code: `<Textarea sizeVariant="xl" placeholder="XLarge textarea" />`,
    },
    {
      title: "Disabled Durumu",
      description: "Devre dışı bırakılmış textarea örneği.",
      component: (
        <Textarea
          disabled
          value="This textarea is disabled"
        />
      ),
      code: `<Textarea disabled value="This textarea is disabled" />`,
    },
  ];

  const tabs = [
    { id: "examples", label: "Örnekler" },
    { id: "code", label: "Komponent Kodu" },
  ];

  const textareaComponentCode = `"use client"

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

export { Textarea }`;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Textarea Bileşeni
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
              <code className="text-sm">{textareaComponentCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
