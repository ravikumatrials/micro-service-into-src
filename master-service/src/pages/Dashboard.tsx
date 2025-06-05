
import { Card } from "../components/ui/card";
import { Users, Folder, UserCheck, Settings } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Projects", count: "24", icon: Folder, color: "text-blue-600" },
    { title: "Active Employees", count: "156", icon: Users, color: "text-green-600" },
    { title: "Roles Defined", count: "8", icon: UserCheck, color: "text-purple-600" },
    { title: "Attendance Types", count: "5", icon: Settings, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Master Service Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage projects, employees, roles, and system configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-8 w-8" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">Downtown Commercial Complex</span>
              <span className="text-sm text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">Marina Gardens Landscaping</span>
              <span className="text-sm text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium">Heritage Village Restoration</span>
              <span className="text-sm text-orange-600">Planning</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Database Connection</span>
              <span className="text-green-600 font-medium">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <span>API Gateway</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Service Communication</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
