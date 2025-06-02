import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TimeFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TimeField = ({ label, value, onChange }: TimeFieldProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <Input
          placeholder="HH:MM AM/PM"
          value={value}
          onChange={handleTimeChange}
          className="pr-10"
        />
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              variant={"ghost"}
              className={cn(
                "absolute right-2.5 top-0 h-10 rounded-md p-2 text-muted-foreground hover:bg-secondary",
                !value && "text-muted-foreground"
              )}
              aria-label="Set Time"
            >
              <Calendar className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <input
              type="time"
              value={value}
              onChange={handleTimeChange}
              className="w-full"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TimeField;
