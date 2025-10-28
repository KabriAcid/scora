import { cn } from "@/lib/utils";

interface DateSelectorProps {
  selectedDate: number;
  onDateChange: (date: number) => void;
}

export const DateSelector = ({ selectedDate, onDateChange }: DateSelectorProps) => {
  const dates = [15, 16, 17, 18, 19, 20, 21, 22];
  const days = ["We", "Th", "Fr", "Sa", "Su", "Mo", "Tu", "We"];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-1">
      {dates.map((date, index) => (
        <button
          key={date}
          onClick={() => onDateChange(date)}
          className={cn(
            "flex flex-col items-center justify-center min-w-[48px] h-16 rounded-xl transition-all",
            selectedDate === date
              ? "bg-accent text-accent-foreground shadow-lg scale-105"
              : "bg-card text-foreground hover:bg-secondary"
          )}
        >
          <span className="text-xs font-medium mb-1">{days[index]}</span>
          <span className="text-lg font-bold">{date}</span>
        </button>
      ))}
    </div>
  );
};
