
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface EmployeeFieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

const EmployeeField = ({ label, placeholder, value, onChange }: EmployeeFieldProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="employee" className="text-xl font-medium text-gray-700">
        {label}
      </Label>
      <Input
        id="employee"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg py-4 px-5 rounded-xl border-2 border-gray-200 focus:border-proscape focus:ring-0"
      />
    </div>
  )
}

export default EmployeeField
