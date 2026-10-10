import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const exams = [
  {
    id: "EXM001",
    name: "Monthly Test - September",
    className: "XII",
    date: "15 Sep 2026",
    totalMarks: 70,
    status: "Completed",
  },
  {
    id: "EXM002",
    name: "Unit Test - September",
    className: "XI",
    date: "20 Sep 2026",
    totalMarks: 50,
    status: "Upcoming",
  },
  {
    id: "EXM003",
    name: "Monthly Test - October",
    className: "XII",
    date: "10 Oct 2026",
    totalMarks: 70,
    status: "Upcoming",
  },
];

export function ExamTable() {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Exam</TableHead>
            <TableHead>Exam ID</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total Marks</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell className="font-medium">
                {exam.name}
              </TableCell>
              <TableCell>{exam.id}</TableCell>
              <TableCell>{exam.className}</TableCell>
              <TableCell>{exam.date}</TableCell>
              <TableCell>{exam.totalMarks}</TableCell>
              <TableCell>{exam.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}