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

// This component is no longer needed but we're keeping the file for backward compatibility
export function StatCards({ stats }: StatCardsProps) {
  return null;
}
