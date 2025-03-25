import { ReactNode } from "react";
import { CodeBlock } from "@/components/CodeBlock";

interface ShowcaseProps {
  title: string;
  description: string;
  component: ReactNode;
  code: string;
}

export function ComponentShowcase({ title, description, component, code }: ShowcaseProps) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all">
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        {title}
      </h2>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      <div className="mb-4">
        {component}
      </div>
      <CodeBlock className="mt-4">
        {code}
      </CodeBlock>
    </div>
  );
} 