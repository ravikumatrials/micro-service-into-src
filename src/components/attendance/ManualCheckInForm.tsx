
import { User } from "lucide-react";
import EmployeeField from "../ManualFormFields/EmployeeField";
import ProjectField from "../ManualFormFields/ProjectField";
import TimeField from "../ManualFormFields/TimeField";
import ReasonField from "../ManualFormFields/ReasonField";

interface ManualCheckInFormProps {
  projects: { id: number; name: string }[];
}

const ManualCheckInForm = ({ projects }: ManualCheckInFormProps) => {
  return (
    <div className="max-w-xl mx-auto border-2 rounded-2xl p-10 bg-white shadow-2xl animate-fade-in lg:max-w-2xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center gap-4">
        <User className="h-8 w-8 text-proscape" />
        Manual Check In
      </h3>
      <form className="space-y-7">
        <EmployeeField label="Employee ID or Name" placeholder="Enter employee ID or name" />
        <ProjectField projects={projects} />
        <TimeField label="Check In Time" />
        <ReasonField label="Reason for Manual Check In" placeholder="Enter reason" />
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-proscape hover:bg-proscape-dark text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualCheckInForm;
