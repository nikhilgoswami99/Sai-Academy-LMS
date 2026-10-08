import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const teachers = [
  {
    id: "TCH001",
    name: "Sachin Kumar",
    subject: "Physics",
    batches: 2,
    status: "Active",
  },
  {
    id: "TCH002",
    name: "Hemant Kumar",
    subject: "Mathematics",
    batches: 2,
    status: "Active",
  },
  {
    id: "TCH003",
    name: "Priyanka Mishra",
    subject: "Chemistry",
    batches: 2,
    status: "Active",
  },
];

export function TeacherTable() {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Teacher ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Batches</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell className="font-medium">
                {teacher.name}
              </TableCell>

              <TableCell>{teacher.id}</TableCell>

              <TableCell>{teacher.subject}</TableCell>

              <TableCell>{teacher.batches}</TableCell>

              <TableCell>{teacher.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}