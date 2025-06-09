
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ReasonFieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

const ReasonField = ({ label, placeholder, value, onChange }: ReasonFieldProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="reason" className="text-xl font-medium text-gray-700">
        {label}
      </Label>
      <Textarea
        id="reason"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg py-4 px-5 rounded-xl border-2 border-gray-200 focus:border-proscape focus:ring-0 min-h-[120px]"
      />
    </div>
  )
}

export default ReasonField
