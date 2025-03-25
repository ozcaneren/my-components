"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import Select from "@/components/Select";
import { cn } from "@/lib/utils";

export default function SelectPage() {
  const [activeTab, setActiveTab] = useState<"examples" | "code">("examples");
  const [isCopied, setIsCopied] = useState(false);

  const options = [
    { label: "Seçenek 1", value: "option1" },
    { label: "Seçenek 2", value: "option2" },
    { label: "Seçenek 3", value: "option3" },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectComponentCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel select kullanımı.",
      component: (
        <Select
          options={options}
          placeholder="Select an option"
        />
      ),
      code: `<Select\n options={[]}\n placeholder="Select an option"\n/>`,
    },
    {
      title: "Önceden Seçili",
      description: "Varsayılan değer ile select kullanımı.",
      component: (
        <Select
          options={options}
          value="2"
          placeholder="Select an option"
        />
      ),
      code: `<Select\n options={[]}\n value="2"\n placeholder="Select an option"\n/>`,
    },
  ];

  const tabs = [
    { id: "examples", label: "Örnekler" },
    { id: "code", label: "Komponent Kodu" },
  ];

  const selectComponentCode = `"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Seçiniz",
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((opt) => opt.value === value) || null
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setIsOpen(false);
          setSearchTerm("");
          setFocusedIndex(-1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[focusedIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, filteredOptions]);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
    setFocusedIndex(-1);
    onChange?.(option.value);
  };

  return (
    <div ref={selectRef} className="relative w-full">
      <div
        className="flex items-center justify-between w-full px-4 py-2 border rounded-lg cursor-pointer bg-background border-input hover:border-input/80"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={\`\${
            selectedOption ? "text-foreground" : "text-muted-foreground"
          }\`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={\`w-4 h-4 transition-transform 
            text-muted-foreground
            \${isOpen ? "rotate-180" : ""}\`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 
          bg-background
          border border-input
          rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          <div
            className="sticky top-0 p-2 
            bg-background
            border-b border-input"
          >
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm
                bg-background
                border border-input
                rounded-md
                placeholder-muted-foreground
                text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ara..."
            />
          </div>

          <div className="p-2">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-sm text-muted-foreground">
                Sonuç bulunamadı
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={\`px-4 py-2 text-sm cursor-pointer rounded-md
                    \${index === focusedIndex ? "bg-muted" : "hover:bg-muted"}
                    \${selectedOption?.value === option.value ? "bg-background" : ""}
                    \${index !== filteredOptions.length - 1 ? "border-b border-input/50" : ""}
                    text-foreground\`}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}`;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">Select Bileşeni</h1>

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
              <code className="text-sm">{selectComponentCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
