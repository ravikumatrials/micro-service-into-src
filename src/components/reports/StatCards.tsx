
import { Card } from "@/components/ui/card";

interface StatCardsProps {
  stats: {
    present: number;
    absent: number;
    avgHours: number;
    manualEntries: number;
    missedCheckouts: number;
    pendingApprovals: number;
  };
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      <Card className="p-4 bg-green-50 border-l-4 border-green-400">
        <h3 className="text-sm font-medium text-green-800 mb-1">Present Today</h3>
        <p className="text-2xl font-bold text-green-900">{stats.present}</p>
      </Card>
      
      <Card className="p-4 bg-red-50 border-l-4 border-red-400">
        <h3 className="text-sm font-medium text-red-800 mb-1">Absent Today</h3>
        <p className="text-2xl font-bold text-red-900">{stats.absent}</p>
      </Card>
      
      <Card className="p-4 bg-blue-50 border-l-4 border-blue-400">
        <h3 className="text-sm font-medium text-blue-800 mb-1">Avg. Work Hours</h3>
        <p className="text-2xl font-bold text-blue-900">{stats.avgHours}h</p>
      </Card>
      
      <Card className="p-4 bg-purple-50 border-l-4 border-purple-400">
        <h3 className="text-sm font-medium text-purple-800 mb-1">Manual Entries</h3>
        <p className="text-2xl font-bold text-purple-900">{stats.manualEntries}</p>
      </Card>
      
      <Card className="p-4 bg-amber-50 border-l-4 border-amber-400">
        <h3 className="text-sm font-medium text-amber-800 mb-1">Missed Check-outs</h3>
        <p className="text-2xl font-bold text-amber-900">{stats.missedCheckouts}</p>
      </Card>
      
      <Card className="p-4 bg-orange-50 border-l-4 border-orange-400">
        <h3 className="text-sm font-medium text-orange-800 mb-1">Pending Approvals</h3>
        <p className="text-2xl font-bold text-orange-900">{stats.pendingApprovals}</p>
      </Card>
    </div>
  );
}
