
import { Clock } from "lucide-react";

const ExceptionTables = () => (
  <>
    <div className="rounded-lg border p-0 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-700">Pending Check Outs</h3>
        <p className="text-xs text-gray-500 mt-1">
          Employees who checked in but didn't check out
        </p>
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Employee
                </th>
                <th scope="col" className="px-4 py-3">
                  Check In Time
                </th>
                <th scope="col" className="px-4 py-3">
                  Project
                </th>
                <th scope="col" className="px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3">John Smith</td>
                <td className="px-4 py-3">08:32 AM</td>
                <td className="px-4 py-3">Main Building</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3 inline" />
                      Manual
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3">Sarah Johnson</td>
                <td className="px-4 py-3">08:45 AM</td>
                <td className="px-4 py-3">Bridge Expansion</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3 inline" />
                      Manual
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="mt-6 rounded-lg border p-0 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-700">Missed Check Ins</h3>
        <p className="text-xs text-gray-500 mt-1">
          Employees who checked out but didn't check in
        </p>
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Employee
                </th>
                <th scope="col" className="px-4 py-3">
                  Check Out Time
                </th>
                <th scope="col" className="px-4 py-3">
                  Project
                </th>
                <th scope="col" className="px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No missed check-ins found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
);

export default ExceptionTables;
