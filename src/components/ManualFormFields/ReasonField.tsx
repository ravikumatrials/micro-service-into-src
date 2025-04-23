
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ReasonFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  id?: string;
}

const ReasonField = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error = false, 
  errorMessage = "", 
  id 
}: ReasonFieldProps) => (
  <div className="w-full space-y-2">
    <Label htmlFor={id || "reason-input"} className="block text-xl font-medium text-gray-700">
      {label}
    </Label>
    <Textarea
      id={id || "reason-input"}
      className={`w-full px-5 py-4 text-xl min-h-[120px] ${
        error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-proscape"
      }`}
      placeholder={placeholder}
      rows={5}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
    {error && errorMessage && (
      <p className="text-sm text-red-500">{errorMessage}</p>
    )}
  </div>
);

export default ReasonField;
