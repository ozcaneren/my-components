"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/Button"

interface DatePickerProps {
  date?: Date
  setDate: (date: Date | undefined) => void
  className?: string
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState(date || new Date())
  const [viewMode, setViewMode] = React.useState<"days" | "years">("days")
  const [yearRangeStart, setYearRangeStart] = React.useState(() => {
    const year = (date || new Date()).getFullYear()
    return Math.floor(year / 12) * 12
  })

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)
  const remainingDays = Array.from({ length: 6 - lastDayOfMonth }, (_, i) => i)
  const years = Array.from({ length: 12 }, (_, i) => yearRangeStart + i)

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ]

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    return (
      date &&
      day === date.getDate() &&
      currentMonth.getMonth() === date.getMonth() &&
      currentMonth.getFullYear() === date.getFullYear()
    )
  }

  const isCurrentYear = (year: number) => {
    return currentMonth.getFullYear() === year
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setDate(newDate)
    setIsOpen(false)
  }

  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1))
    setViewMode("days")
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const previousYearRange = () => {
    setYearRangeStart(yearRangeStart - 12)
  }

  const nextYearRange = () => {
    setYearRangeStart(yearRangeStart + 12)
  }

  return (
    <div className={cn("relative w-full", className)}>
      <Button
        variant="outline"
        className={cn(
          "w-full inline-flex items-center justify-start hover:bg-accent hover:text-accent-foreground",
          !date && "text-muted-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span>{date ? format(date, "PPP") : "Tarih seçin"}</span>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-[280px] rounded-md border bg-background p-4 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              sizeVariant="sm"
              onClick={viewMode === "days" ? previousMonth : previousYearRange}
              className="h-9 w-9 p-0 hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setViewMode(viewMode === "days" ? "years" : "days")}
              className="text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors px-3"
            >
              {viewMode === "days" ? (
                <span>
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
              ) : (
                <span>
                  {yearRangeStart} - {yearRangeStart + 11}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              sizeVariant="sm"
              onClick={viewMode === "days" ? nextMonth : nextYearRange}
              className="h-9 w-9 p-0 hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {viewMode === "days" ? (
            <>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {emptyDays.map((_, index) => (
                  <div key={`empty-${index}`} />
                ))}
                {days.map((day) => (
                  <Button
                    key={day}
                    variant={isSelected(day) ? "default" : "ghost"}
                    sizeVariant="sm"
                    className={cn(
                      "h-9 w-9 p-0 text-base font-normal transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isToday(day) && "font-bold",
                      isSelected(day) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    )}
                    onClick={() => handleDateSelect(day)}
                  >
                    {day}
                  </Button>
                ))}
                {remainingDays.map((_, index) => (
                  <div key={`remaining-${index}`} />
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {years.map((year) => (
                <Button
                  key={year}
                  variant={isCurrentYear(year) ? "default" : "ghost"}
                  onClick={() => handleYearSelect(year)}
                  className={cn(
                    "h-9 text-base font-normal transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isCurrentYear(year) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  {year}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 