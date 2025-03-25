"use client";

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
          className={`${
            selectedOption ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform 
            text-muted-foreground
            ${isOpen ? "rotate-180" : ""}`}
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
                  className={`px-4 py-2 text-sm cursor-pointer rounded-md
                    ${index === focusedIndex ? "bg-muted" : "hover:bg-muted"}
                    ${selectedOption?.value === option.value ? "bg-background" : ""}
                    ${index !== filteredOptions.length - 1 ? "border-b border-input/50" : ""}
                    text-foreground`}
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
}
