"use client"

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
} 