
import { Card } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";

const StatCards = () => {
  const stats = [
    { title: "Total Employees", value: "6,000", icon: Users, color: "text-blue-600" },
    { title: "Present Today", value: "5,200", icon: CheckCircle, color: "text-green-600" },
    { title: "Absent Today", value: "800", icon: XCircle, color: "text-red-600" },
    { title: "Pending Checkouts", value: "150", icon: Clock, color: "text-orange-600" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;
