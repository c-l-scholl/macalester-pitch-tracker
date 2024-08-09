"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dispatch, SetStateAction, useState } from "react"

interface DatePickerProps {
	date: Date | null;
	setDate: Dispatch<SetStateAction<Date | null>>;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [calendarDate, setCalendarDate] = useState<Date>(date ?? new Date());
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !calendarDate && "text-muted-foreground"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {calendarDate ? format(calendarDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={calendarDate}
          onSelect={(day: Date | undefined) => {
						if (day !== undefined) {
							setDate(day);
              setCalendarDate(day);
              setIsOpen(false);
						} else {
							// Handle the case when day is undefined if necessary
							// For example, you might want to clear the date or set it to a default value
							setDate(new Date());
              setCalendarDate(new Date());
						}
					}}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker;
