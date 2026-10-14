export interface Batch {
  id: string;
  name: string;
  className: string;
  teacher: string;
  students: number;
  status: "Active" | "Inactive";
}
