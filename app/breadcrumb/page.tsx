"use client";

import { useState } from "react";
import { Copy, Check, Home, Package, Zap } from "lucide-react";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ChevronRightCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BreadcrumbPage() {
  const [activeTab, setActiveTab] = useState<"examples" | "code">("examples");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(breadcrumbComponentCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel breadcrumb kullanımı.",
      component: (
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Electronics" },
          ]}
        />
      ),
      code: `<Breadcrumb\n  items={[]}\n/>`,
    },
    {
      title: "İkonlu Kullanım",
      description: "İkonlar ile breadcrumb kullanımı.",
      component: (
        <Breadcrumb
          items={[
            {
              label: "Home",
              href: "/",
              icon: <Home className="h-4 w-4" />,
            },
            {
              label: "Products",
              href: "/products",
              icon: <Package className="h-4 w-4" />,
            },
            {
              label: "X's",
              icon: <Zap className="h-4 w-4" />,
            },
          ]}
          showIcons={true}
        />
      ),
      code: `<Breadcrumb\n  items={[]}\n  showIcons={true}\n/>`,
    },
    {
      title: "Minimal Varyant",
      description: "Minimal stil ile breadcrumb kullanımı.",
      component: (
        <Breadcrumb
          variant="minimal"
          items={[
            { label: "Docs", href: "/docs" },
            { label: "Components", href: "/docs/components" },
            { label: "Breadcrumb" },
          ]}
        />
      ),
      code: `<Breadcrumb\n  variant="minimal"\n  items={[]}\n/>`,
    },
    {
      title: "Ok İşaretli",
      description: "Ok işaretleri ile breadcrumb kullanımı.",
      component: (
        <Breadcrumb
          variant="arrows"
          items={[
            { label: "Settings", href: "/settings" },
            { label: "Profile", href: "/settings/profile" },
            { label: "Appearance" },
          ]}
        />
      ),
      code: `<Breadcrumb\n  variant="arrows"\n  items={[]}\n/>`,
    },
    {
      title: "Noktalı",
      description: "Nokta ayraçları ile breadcrumb kullanımı.",
      component: (
        <Breadcrumb
          variant="dots"
          items={[
            { label: "Projects", href: "/projects" },
            { label: "Web App", href: "/projects/web-app" },
            { label: "Dashboard" },
          ]}
        />
      ),
      code: `<Breadcrumb\n  variant="dots"\n  items={[]}\n/>`,
    },
    {
      title: "Özel Ayraç",
      description: "Özel ayraç ile breadcrumb kullanımı.",
      component: (
        <Breadcrumb
          items={[
            { label: "Level 1", href: "/level1" },
            { label: "Level 2", href: "/level1/level2" },
            { label: "Level 3" },
          ]}
          separator={<ChevronRightCircle className="h-4 w-4" />}
        />
      ),
      code: `<Breadcrumb\n  items={[]}\n  separator={<ChevronRightCircle className="h-4 w-4" />}\n/>`,
    },
  ];

  const tabs = [
    { id: "examples", label: "Örnekler" },
    { id: "code", label: "Komponent Kodu" },
  ];

  const breadcrumbComponentCode = `"use client";

import * as React from "react";
import Link from "next/link";
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
  const activeSeparator = separator || defaultSeparators[variant];

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
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors duration-200",
                      variant === "default" && "text-muted-foreground",
                      variant === "minimal" && "text-muted-foreground hover:text-foreground",
                      variant === "arrows" && "text-muted-foreground font-normal",
                      variant === "dots" && "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {showIcons && item.icon && (
                      <span className="inline-flex shrink-0 items-center justify-center h-4 w-4 opacity-70">{item.icon}</span>
                    )}
                    <span className="inline-flex items-center">{item.label}</span>
                  </Link>
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
                  {showIcons && item.icon && (
                    <span className="inline-flex shrink-0 items-center justify-center h-4 w-4 opacity-70">{item.icon}</span>
                  )}
                  <span className="inline-flex items-center">{item.label}</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}`;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Breadcrumb Bileşeni
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
              <code className="text-sm">{breadcrumbComponentCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
