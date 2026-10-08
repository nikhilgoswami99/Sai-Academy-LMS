import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const students = [
  {
    id: "STU001",
    name: "Rahul Sharma",
    className: "XII",
    batch: "A",
    status: "Active",
  },
  {
    id: "STU002",
    name: "Priya Singh",
    className: "XI",
    batch: "B",
    status: "Active",
  },
  {
    id: "STU003",
    name: "Aman Verma",
    className: "XII",
    batch: "A+",
    status: "Active",
  },
];

export function StudentTable() {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                {student.name}
              </TableCell>

              <TableCell>{student.id}</TableCell>

              <TableCell>{student.className}</TableCell>

              <TableCell>{student.batch}</TableCell>

              <TableCell>{student.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}