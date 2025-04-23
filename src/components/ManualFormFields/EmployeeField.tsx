
import React from "react";

interface EmployeeFieldProps {
  label: string;
  placeholder: string;
}

const EmployeeField = ({ label, placeholder }: EmployeeFieldProps) => (
  <div className="w-full">
    <label className="block text-xl font-medium text-gray-700 mb-3">{label}</label>
    <input
      type="text"
      className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-proscape text-xl shadow-sm"
      placeholder={placeholder}
    />
  </div>
);

export default EmployeeField;
