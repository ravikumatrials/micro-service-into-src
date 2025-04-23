
import { User } from "lucide-react";
import EmployeeField from "../ManualFormFields/EmployeeField";
import ProjectField from "../ManualFormFields/ProjectField";
import TimeField from "../ManualFormFields/TimeField";
import ReasonField from "../ManualFormFields/ReasonField";

interface ManualCheckOutFormProps {
  projects: { id: number; name: string }[];
}

const ManualCheckOutForm = ({ projects }: ManualCheckOutFormProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto border-2 rounded-2xl p-12 bg-white shadow-2xl animate-fade-in">
      <h3 className="text-3xl font-semibold text-gray-900 mb-10 flex items-center gap-4">
        <User className="h-10 w-10 text-proscape" />
        Manual Check Out
      </h3>
      <form className="space-y-8">
        <EmployeeField label="Employee ID or Name" placeholder="Enter employee ID or name" />
        <ProjectField projects={projects} />
        <TimeField label="Check Out Time" />
        <ReasonField label="Reason for Manual Check Out" placeholder="Enter reason" />
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-proscape hover:bg-proscape-dark text-white px-10 py-4 rounded-xl text-xl font-medium transition-colors shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualCheckOutForm;
