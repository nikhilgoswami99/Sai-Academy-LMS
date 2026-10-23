import { CalendarDays, CircleCheck, CircleX, Users } from "lucide-react";

import { PageHeader } from "../../../../components/dashboard/pageHeader";
import { StatCard } from "../../../../components/dashboard/statCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

const attendanceStats = [
  { title: "Students tracked", icon: Users },
  { title: "Present today", icon: CircleCheck },
  { title: "Absent today", icon: CircleX },
  { title: "Sessions today", icon: CalendarDays },
];

export default function AttendancePage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Attendance"
        description="Track daily attendance across classes and batches"
      />

      <section
        aria-label="Attendance summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {attendanceStats.map(({ title, icon }) => (
          <StatCard
            key={title}
            title={title}
            value="—"
            icon={icon}
            description="No attendance data yet"
          />
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold">Recent attendance</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Attendance sessions will appear here once recorded.
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Class / batch</TableHead>
              <TableHead>Present</TableHead>
              <TableHead>Absent</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                No attendance sessions recorded yet.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
