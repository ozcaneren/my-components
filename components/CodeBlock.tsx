interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className = "" }: CodeBlockProps) {
  return (
    <pre className={`bg-muted p-3 rounded-lg text-sm overflow-x-auto ${className}`}>
      <code>{children}</code>
    </pre>
  );
} 