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
import { Dispatch, SetStateAction } from "react"

interface DatePickerProps {
	date: Date;
	setDate: Dispatch<SetStateAction<Date>>;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day: Date | undefined) => {
						if (day !== undefined) {
							setDate(day);
						} else {
							// Handle the case when day is undefined if necessary
							// For example, you might want to clear the date or set it to a default value
							setDate(new Date());
						}
					}}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker;
