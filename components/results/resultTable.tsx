import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const results = [
  {
    id: "RES001",
    student: "Rahul Sharma",
    studentId: "STU001",
    className: "XII",
    exam: "Monthly Test - September",
    marks: 62,
    totalMarks: 70,
    percentage: "88.6%",
    status: "Published",
  },
  {
    id: "RES002",
    student: "Priya Singh",
    studentId: "STU002",
    className: "XI",
    exam: "Monthly Test - September",
    marks: 58,
    totalMarks: 70,
    percentage: "82.9%",
    status: "Published",
  },
  {
    id: "RES003",
    student: "Aman Verma",
    studentId: "STU003",
    className: "XII",
    exam: "Monthly Test - September",
    marks: 45,
    totalMarks: 70,
    percentage: "64.3%",
    status: "Draft",
  },
];

export function ResultTable() {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Exam</TableHead>
            <TableHead>Marks</TableHead>
            <TableHead>Percentage</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id}>
              <TableCell className="font-medium">{result.student}</TableCell>

              <TableCell>{result.studentId}</TableCell>
              <TableCell>{result.className}</TableCell>

              <TableCell>{result.exam}</TableCell>

              <TableCell>
                {result.marks}/{result.totalMarks}
              </TableCell>

              <TableCell>{result.percentage}</TableCell>

              <TableCell>{result.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
