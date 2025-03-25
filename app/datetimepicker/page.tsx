"use client";

import { DatePicker } from "@/components/DatePicker";
import { DateTimePicker } from "@/components/DateTimePicker";
import { TimePicker } from "@/components/TimePicker";
import { useState } from "react";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DateTimePickerPage() {
  const [activeTab, setActiveTab] = useState<"examples" | "code">("examples");
  const [isCopied, setIsCopied] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dateTimePickerComponentCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const showcases = [
    {
      title: "Basit Kullanım",
      description: "En temel datetime picker kullanımı.",
      component: (
        <DatePicker
          date={date}
          setDate={(newDate) => setDate(newDate)}
          className="w-full"
        />
      ),
      code: `<DatePicker\n date={date}\n setDate={(newDate) => setDate(newDate)}\n className="w-full"\n/>`,
    },
    {
      title: "12 Saat Formatı",
      description: "12 saat formatında datetime picker kullanımı.",
      component: (
        <TimePicker
          value={date}
          onChange={(newDate) => setDate(newDate)}
          use24Hour={false}
        />
      ),
      code: `<TimePicker\n value={date}\n onChange={(newDate) => setDate(newDate)}\n use24Hour={false}\n/>`,
    },
    {
      title: "24 Saat Formatı",
      description: "24 saat formatında datetime picker kullanımı.",
      component: (
        <TimePicker
          value={date}
          onChange={(newDate) => setDate(newDate)}
          use24Hour={true}
        />
      ),
      code: `<TimePicker\n value={date}\n onChange={(newDate) => setDate(newDate)}\n use24Hour={true}\n/>`,
    },
    {
      title: "Tarih ve Saat Seçimi",
      description: "Tarih ve saat seçimi yapılabilen datetime picker kullanımı.",
      component: (
        <DateTimePicker
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
      ),
      code: `<DateTimePicker\n value={date}\n onChange={(newDate) => setDate(newDate)}\n/>`,
    },
    {
      title: "Önceden Seçili Tarih",
      description: "Varsayılan değer ile datetime picker kullanımı.",
      component: (
        <DateTimePicker
          value={new Date(2024, 2, 25, 15, 30)}
          onChange={(newDate) => setDate(newDate)}
        />
      ),
      code: `<DateTimePicker\n value={new Date(2024, 2, 25, 15, 30)}\n onChange={(newDate) => setDate(newDate)}\n/>`,
    },
  ];

  const tabs = [
    { id: "examples", label: "Örnekler" },
    { id: "code", label: "Komponent Kodu" },
  ];

  const dateTimePickerComponentCode = `"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { DatePicker } from "./DatePicker"
import { TimePicker } from "./TimePicker"

interface DateTimePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  use24Hour?: boolean
  className?: string
}

export function DateTimePicker({
  value,
  onChange,
  use24Hour = true,
  className
}: DateTimePickerProps) {
  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) {
      onChange(undefined)
      return
    }

    const newDateTime = value ? new Date(value) : new Date()
    newDateTime.setFullYear(newDate.getFullYear())
    newDateTime.setMonth(newDate.getMonth())
    newDateTime.setDate(newDate.getDate())
    onChange(newDateTime)
  }

  const handleTimeChange = (newTime: Date | undefined) => {
    if (!newTime) {
      onChange(undefined)
      return
    }

    const newDateTime = value ? new Date(value) : new Date()
    newDateTime.setHours(newTime.getHours())
    newDateTime.setMinutes(newTime.getMinutes())
    onChange(newDateTime)
  }

  return (
    <div className={cn("flex w-full flex-col gap-3 sm:gap-2", className)}>
      <div className="w-full">
        <DatePicker
          date={value}
          setDate={handleDateChange}
        />
      </div>
      <div className="w-full">
        <TimePicker
          value={value}
          onChange={handleTimeChange}
          use24Hour={use24Hour}
        />
      </div>
    </div>
  )
}`;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Date & Time Picker Bileşeni
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
              <code className="text-sm">{dateTimePickerComponentCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
