
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Settings, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MasterDashboard = () => {
  const navigate = useNavigate();

  const masterModules = [
    {
      title: "Employee Management",
      description: "Manage employee data, assignments, and status",
      icon: Users,
      path: "/master/employees",
      count: "6,000 employees"
    },
    {
      title: "Project Management", 
      description: "Manage projects, locations, and assignments",
      icon: Briefcase,
      path: "/master/projects",
      count: "25 active projects"
    },
    {
      title: "Role & Permissions",
      description: "Configure roles and access permissions",
      icon: Shield,
      path: "/master/roles",
      count: "12 roles defined"
    },
    {
      title: "Attendance Types",
      description: "Configure attendance types and policies",
      icon: Settings,
      path: "/master/attendance-type",
      count: "5 types active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Master Data Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {masterModules.map((module) => (
          <Card key={module.title} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(module.path)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-proscape/10 rounded-lg">
                    <module.icon className="h-6 w-6 text-proscape" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <p className="text-sm text-proscape font-medium">{module.count}</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-proscape">6,000</p>
            <p className="text-sm text-gray-600">Total Employees</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">25</p>
            <p className="text-sm text-gray-600">Active Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600">User Roles</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">5</p>
            <p className="text-sm text-gray-600">Attendance Types</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MasterDashboard;
