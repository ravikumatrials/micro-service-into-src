
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectFieldProps {
  projects: { id: number; name: string }[]
  value: string
  onChange: (value: string) => void
}

const ProjectField = ({ projects, value, onChange }: ProjectFieldProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="project" className="text-xl font-medium text-gray-700">
        Project
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="text-lg py-4 px-5 rounded-xl border-2 border-gray-200 focus:border-proscape focus:ring-0">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id.toString()}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ProjectField
