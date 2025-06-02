
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  UserCheck,
  FileText
} from "lucide-react";

const Dashboard = () => {
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  useEffect(() => {
    // Simulate periodic sync updates
    const interval = setInterval(() => {
      setLastSyncTime(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "Total Employees",
      value: "1,234",
      icon: Users,
      trend: "+5.2%",
      color: "blue"
    },
    {
      title: "Present Today",
      value: "1,089",
      icon: CheckCircle,
      trend: "+2.1%",
      color: "green"
    },
    {
      title: "Absent Today",
      value: "145",
      icon: XCircle,
      trend: "-1.5%",
      color: "red"
    },
    {
      title: "On Leave",
      value: "67",
      icon: Calendar,
      trend: "+0.8%",
      color: "yellow"
    },
    {
      title: "Late Check-ins",
      value: "23",
      icon: Clock,
      trend: "-3.2%",
      color: "orange"
    },
    {
      title: "Pending Approvals",
      value: "8",
      icon: AlertTriangle,
      trend: "+12.5%",
      color: "purple"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Live
          </Badge>
          <span className="text-sm text-gray-500">
            Last sync: {lastSyncTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`h-4 w-4 text-${stat.color}-600`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <p className={`text-xs ${
                  stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest attendance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Check-in", employee: "Ahmed Al-Mansouri", time: "08:15 AM", status: "on-time" },
                { action: "Check-out", employee: "Fatima Al-Hashimi", time: "05:30 PM", status: "early" },
                { action: "Exception", employee: "Mohammed Al-Farsi", time: "09:45 AM", status: "late" },
                { action: "Check-in", employee: "Aisha Al-Blooshi", time: "08:00 AM", status: "on-time" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium">{activity.employee}</p>
                    <p className="text-xs text-gray-500">{activity.action} at {activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.status === 'on-time' ? 'default' : activity.status === 'early' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium">Manual Attendance</div>
                <div className="text-xs text-gray-500">Record attendance manually</div>
              </button>
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium">Generate Report</div>
                <div className="text-xs text-gray-500">Create attendance reports</div>
              </button>
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium">Bulk Upload</div>
                <div className="text-xs text-gray-500">Upload attendance data</div>
              </button>
              <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-sm font-medium">Employee Management</div>
                <div className="text-xs text-gray-500">Manage employee records</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
