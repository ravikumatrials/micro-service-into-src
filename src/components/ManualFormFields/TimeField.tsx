
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  id?: string;
}

const TimeField = ({ 
  label, 
  value, 
  onChange, 
  error = false, 
  errorMessage = "", 
  id 
}: TimeFieldProps) => (
  <div className="w-full space-y-2">
    <Label htmlFor={id || "time-input"} className="block text-xl font-medium text-gray-700">
      {label}
    </Label>
    <Input
      type="time"
      id={id || "time-input"}
      className={`w-full px-5 py-6 text-xl h-auto ${
        error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-proscape"
      }`}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
    {error && errorMessage && (
      <p className="text-sm text-red-500">{errorMessage}</p>
    )}
  </div>
);

export default TimeField;
