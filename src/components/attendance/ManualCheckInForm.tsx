
import { User } from "lucide-react";

interface ManualCheckInFormProps {
  projects: { id: number; name: string }[];
}

const ManualCheckInForm = ({ projects }: ManualCheckInFormProps) => {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-proscape" />
        Manual Check In
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID or Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
            placeholder="Enter employee ID or name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape">
            <option value="">Select project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check In Time
          </label>
          <input
            type="time"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Manual Check In
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proscape"
            placeholder="Enter reason"
            rows={4}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button className="bg-proscape hover:bg-proscape-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualCheckInForm;

