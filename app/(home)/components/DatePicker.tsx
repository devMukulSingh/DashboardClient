import { format, formatDate } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import useAddParams from "@/lib/hooks/UseAddParams";

type Props = {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
};

const DatePicker = ({ date, setDate }: Props) => {
  const { addSearchParams } = useAddParams();

  const onDateSelect = (date: DateRange | undefined) => {
    setDate(date);
    if (date?.from && !date?.to)
      addSearchParams({
        from: format(date.from, "dd/MM/yyyy"),
        to: null,
      });
    else if (date?.to && !date?.from) {
      addSearchParams({
        from: null,
        to: format(date.to, "dd/MM/yyyy"),
      });
    } else if (date?.to && date?.from) {
      addSearchParams({
        from: format(date.from, "dd/MM/yyyy"),
        to: format(date.to, "dd/MM/yyyy"),
      });
    }
  };
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => onDateSelect(date)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
