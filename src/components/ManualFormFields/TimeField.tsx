
import React from "react";

interface TimeFieldProps {
  label: string;
}

const TimeField = ({ label }: TimeFieldProps) => (
  <div>
    <label className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="time"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-proscape text-lg"
    />
  </div>
);

export default TimeField;
