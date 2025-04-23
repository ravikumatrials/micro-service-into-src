
import React from "react";
import { Input } from "@/components/ui/input";

interface TimeFieldProps {
  label: string;
}

const TimeField = ({ label }: TimeFieldProps) => (
  <div className="w-full">
    <label className="block text-xl font-medium text-gray-700 mb-3">{label}</label>
    <input
      type="time"
      className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-proscape text-xl shadow-sm"
    />
  </div>
);

export default TimeField;
