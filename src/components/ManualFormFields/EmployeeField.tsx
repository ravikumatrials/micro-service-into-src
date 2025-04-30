
import React from "react";

interface EmployeeFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

const EmployeeField = ({ label, placeholder, value = '', onChange }: EmployeeFieldProps) => {
  // Handle numeric-only input for employee ID
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // For employee IDs, only allow numeric values
    if (label.toLowerCase().includes("id") || label.toLowerCase().includes("employee")) {
      // Only update if empty or contains only numbers
      if (inputValue === '' || /^[0-9\b]+$/.test(inputValue)) {
        onChange?.(inputValue);
      }
    } else {
      // For other fields, no validation
      onChange?.(inputValue);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xl font-medium text-gray-700 mb-3">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-proscape text-xl shadow-sm"
        placeholder={placeholder}
      />
      {label.toLowerCase().includes("id") && (
        <p className="mt-1 text-sm text-gray-500">
          Employee ID must contain only numeric values
        </p>
      )}
    </div>
  );
};

export default EmployeeField;
