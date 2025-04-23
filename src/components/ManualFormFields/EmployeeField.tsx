
import React from "react";

interface EmployeeFieldProps {
  label: string;
  placeholder: string;
}
const EmployeeField = ({ label, placeholder }: EmployeeFieldProps) => (
  <div>
    <label className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="text"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-proscape text-lg"
      placeholder={placeholder}
    />
  </div>
);
export default EmployeeField;
