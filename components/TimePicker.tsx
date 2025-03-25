"use client"

import * as React from "react"
import { Clock, ChevronUp, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/Button"

interface TimePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  use24Hour?: boolean
  className?: string
}

export function TimePicker({ value, onChange, use24Hour = true, className }: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [tempHours, setTempHours] = React.useState(() => value ? value.getHours() : 0)
  const [tempMinutes, setTempMinutes] = React.useState(() => value ? value.getMinutes() : 0)
  const [tempPeriod, setTempPeriod] = React.useState<"AM" | "PM">(() => {
    if (!value) return "AM"
    return value.getHours() >= 12 ? "PM" : "AM"
  })

  // Reset temp values when value changes
  React.useEffect(() => {
    if (value) {
      setTempHours(value.getHours())
      setTempMinutes(value.getMinutes())
      setTempPeriod(value.getHours() >= 12 ? "PM" : "AM")
    }
  }, [value])

  // Convert 24h to 12h format
  const displayHours = React.useMemo(() => {
    if (use24Hour) return tempHours
    if (tempHours === 0) return 12
    if (tempHours > 12) return tempHours - 12
    return tempHours
  }, [tempHours, use24Hour])

  const handleConfirm = () => {
    let finalHours = tempHours
    
    if (!use24Hour) {
      if (tempPeriod === "PM" && tempHours !== 12) {
        finalHours = tempHours + 12
      } else if (tempPeriod === "AM" && tempHours === 12) {
        finalHours = 0
      }
    }

    const newDate = value ? new Date(value) : new Date()
    newDate.setHours(finalHours)
    newDate.setMinutes(tempMinutes)
    onChange(newDate)
    setIsOpen(false)
  }

  const incrementHours = () => {
    const newHours = use24Hour
      ? (tempHours + 1) % 24
      : (displayHours % 12) + 1
    setTempHours(use24Hour ? newHours : newHours === 12 ? 0 : newHours)
  }

  const decrementHours = () => {
    const newHours = use24Hour
      ? (tempHours - 1 + 24) % 24
      : ((displayHours - 2 + 12) % 12) + 1
    setTempHours(use24Hour ? newHours : newHours === 12 ? 0 : newHours)
  }

  const incrementMinutes = () => {
    setTempMinutes((prev) => (prev + 1) % 60)
  }

  const decrementMinutes = () => {
    setTempMinutes((prev) => (prev - 1 + 60) % 60)
  }

  const togglePeriod = () => {
    setTempPeriod((prev) => prev === "AM" ? "PM" : "AM")
  }

  const formatTime = () => {
    const formattedHours = displayHours.toString().padStart(2, "0")
    const formattedMinutes = tempMinutes.toString().padStart(2, "0")
    return use24Hour
      ? `${formattedHours}:${formattedMinutes}`
      : `${formattedHours}:${formattedMinutes} ${tempPeriod}`
  }

  return (
    <div className={cn("relative w-full", className)}>
      <Button
        variant="outline"
        className={cn(
          "w-full inline-flex items-center justify-start hover:bg-accent hover:text-accent-foreground",
          !value && "text-muted-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" />
          <span>{value ? formatTime() : "Saat seçin"}</span>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-[280px] rounded-md border bg-background p-4 shadow-md">
          <div className="flex items-center justify-center gap-6 md:gap-8">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                sizeVariant="sm"
                className="h-10 w-10 p-0 hover:bg-accent hover:text-accent-foreground"
                onClick={incrementHours}
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
              <div className="w-14 text-center py-2 text-xl font-medium">
                {displayHours.toString().padStart(2, "0")}
              </div>
              <Button
                variant="ghost"
                sizeVariant="sm"
                className="h-10 w-10 p-0 hover:bg-accent hover:text-accent-foreground"
                onClick={decrementHours}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-xl font-medium">:</div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                sizeVariant="sm"
                className="h-10 w-10 p-0 hover:bg-accent hover:text-accent-foreground"
                onClick={incrementMinutes}
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
              <div className="w-14 text-center py-2 text-xl font-medium">
                {tempMinutes.toString().padStart(2, "0")}
              </div>
              <Button
                variant="ghost"
                sizeVariant="sm"
                className="h-10 w-10 p-0 hover:bg-accent hover:text-accent-foreground"
                onClick={decrementMinutes}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>

            {/* AM/PM */}
            {!use24Hour && (
              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="ghost"
                  className="h-10 px-3 py-1 text-lg font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={togglePeriod}
                >
                  {tempPeriod}
                </Button>
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <div className="mt-4 flex justify-end">
            <Button
              variant="default"
              sizeVariant="sm"
              className="h-9 px-4 hover:bg-primary/90"
              onClick={handleConfirm}
            >
              <Check className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 