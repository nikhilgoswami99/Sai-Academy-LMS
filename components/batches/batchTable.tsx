import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const batches = [
  {
    id: "BAT001",
    name: "Class XII - A",
    className: "XII",
    teacher: "Sachin Kumar",
    students: 32,
    status: "Active",
  },
  {
    id: "BAT002",
    name: "Class XII - B",
    className: "XII",
    teacher: "Hemant Kumar",
    students: 28,
    status: "Active",
  },
  {
    id: "BAT003",
    name: "Class XI - A",
    className: "XI",
    teacher: "Amit Sharma",
    students: 30,
    status: "Active",
  },
];

export function BatchTable() {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Batch</TableHead>
            <TableHead>Batch ID</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {batches.map((batch) => (
            <TableRow key={batch.id}>
              <TableCell className="font-medium">
                {batch.name}
              </TableCell>

              <TableCell>{batch.id}</TableCell>

              <TableCell>{batch.className}</TableCell>

              <TableCell>{batch.teacher}</TableCell>

              <TableCell>{batch.students}</TableCell>

              <TableCell>{batch.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}