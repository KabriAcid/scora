import { useState, useEffect } from "react";
import { cn } from "@/shared/utils/cn";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateSelector = ({ selectedDate, onDateChange }: DateSelectorProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    // Generate a week of dates centered around the selected date
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const dates = Array.from({ length: 8 }, (_, i) => addDays(start, i));
    setWeekDates(dates);
  }, [selectedDate]);

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Month/Year Header with Calendar Dropdown */}
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{format(selectedDate, "MMMM d, yyyy")}</span>
            <motion.div
              animate={{ rotate: isCalendarOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleCalendarSelect}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      {/* Horizontal Date Picker */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {weekDates.map((date, index) => {
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, new Date());
            
            return (
              <motion.button
                key={date.toISOString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDateChange(date)}
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-[48px] h-16 rounded-xl transition-all",
                  isSelected
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-card text-muted-foreground hover:bg-accent/20"
                )}
              >
                {isToday && !isSelected && (
                  <div className="absolute top-1 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
                <span className="text-[10px] font-medium mb-1 uppercase opacity-70">
                  {format(date, "EEE")}
                </span>
                <span className="text-lg font-bold">{format(date, "d")}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
