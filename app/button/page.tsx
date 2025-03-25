"use client";

import { useState } from "react";
import { MailIcon, CheckIcon, Copy, Check } from "lucide-react";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export default function ButtonPage() {
  const [activeTab, setActiveTab] = useState<"examples" | "code">("examples");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buttonComponentCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel button kullanımı.",
      component: <Button>Button</Button>,
      code: `<Button\n  variant="default"\n/>`,
    },
    {
      title: "Outline Variant",
      description: "Outline stilinde button kullanımı.",
      component: <Button variant="outline">Outline Button</Button>,
      code: `<Button\n  variant="outline"\n/>`,
    },
    {
      title: "Disabled Durumu",
      description: "Devre dışı bırakılmış button örneği.",
      component: <Button disabled>Disabled Button</Button>,
      code: `<Button\n  disabled\n/>`,
    },
    {
      title: "Loading Durumu",
      description: "Loading durumu ile button kullanımı.",
      component: <Button isLoading>Loading Button</Button>,
      code: `<Button\n  isLoading\n/>`,
    },
    {
      title: "Ghost Varyant",
      description: "Ghost stilinde button kullanımı.",
      component: <Button variant="ghost">Ghost Button</Button>,
      code: `<Button\n  variant="ghost"\n/>`,
    },
    {
      title: "Secondary Varyant",
      description: "Secondary stilinde button kullanımı.",
      component: <Button variant="secondary">Secondary Button</Button>,
      code: `<Button\n  variant="secondary"\n/>`,
    },
    {
      title: "Destructive Varyant",
      description: "Destructive stilinde button kullanımı.",
      component: <Button variant="destructive">Destructive Button</Button>,
      code: `<Button\n  variant="destructive"\n/>`,
    },
    {
      title: "Left Icon",
      description: "Left icon ile button kullanımı.",
      component: (
        <Button leftIcon={<MailIcon className="w-4 h-4" />}>
          Button with left icon
        </Button>
      ),
      code: `<Button\n  leftIcon={<MailIcon className="w-4 h-4" />}\n/>`,
    },
    {
      title: "Right Icon",
      description: "Right icon ile button kullanımı.",
      component: (
        <Button rightIcon={<CheckIcon className="w-4 h-4" />}>
          Button with right icon
        </Button>
      ),
      code: `<Button\n  rightIcon={<CheckIcon className="w-4 h-4" />}\n/>`,
    },
    {
      title: "Small Boyut",
      description: "Small boyut ile button kullanımı.",
      component: <Button sizeVariant="sm">Small Button</Button>,
      code: `<Button\n  sizeVariant="sm"\n/>`,
    },
    {
      title: "Medium Boyut",
      description: "Medium boyut ile button kullanımı.",
      component: <Button sizeVariant="md">Medium Button</Button>,
      code: `<Button\n  sizeVariant="md"\n/>`,
    },
    {
      title: "Large Boyut",
      description: "Large boyut ile button kullanımı.",
      component: <Button sizeVariant="lg">Large Button</Button>,
      code: `<Button\n  sizeVariant="lg"\n/>`,
    },
    {
      title: "XLarge Boyut",
      description: "XLarge boyut ile button kullanımı.",
      component: <Button sizeVariant="xl">XLarge Button</Button>,
      code: `<Button\n  sizeVariant="xl"\n/>`,
    },
  ];

  const tabs = [
    { id: "examples", label: "Örnekler" },
    { id: "code", label: "Komponent Kodu" },
  ];

  const buttonComponentCode = `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      leftIcon,
      rightIcon,
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {leftIcon}
            {children}
            {rightIcon}
          </div>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };`;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Button Bileşeni
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
              <code className="text-sm">{buttonComponentCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
