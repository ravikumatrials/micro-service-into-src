
import React from "react";

interface ReasonFieldProps {
  label: string;
  placeholder: string;
}
const ReasonField = ({ label, placeholder }: ReasonFieldProps) => (
  <div>
    <label className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-proscape text-lg"
      placeholder={placeholder}
      rows={4}
    />
  </div>
);
export default ReasonField;
