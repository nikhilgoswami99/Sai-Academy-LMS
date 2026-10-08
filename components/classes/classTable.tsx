import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const classes = [
  {
    id: "CLS001",
    name: "Class XI",
    subjects: 3,
    students: 86,
    status: "Active",
  },
  {
    id: "CLS002",
    name: "Class XII",
    subjects: 3,
    students: 94,
    status: "Active",
  },
];

export function ClassTable() {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Class ID</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {classes.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.name}
              </TableCell>

              <TableCell>{item.id}</TableCell>

              <TableCell>{item.subjects}</TableCell>

              <TableCell>{item.students}</TableCell>

              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}