export interface Exam {
  id: string;
  name: string;
  className: string;
  date: string;
  totalMarks: number;
  status: "Upcoming" | "Completed";
}

const monthIndexes: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export function examDateForInput(date: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  const match = date.match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/);
  if (!match) return "";

  const [, day, month, year] = match;
  const monthIndex = monthIndexes[month];
  return monthIndex ? `${year}-${monthIndex}-${day.padStart(2, "0")}` : "";
}

export function formatExamDate(date: string): string {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return date;

  const [, year, month, day] = match;
  const monthName = Object.keys(monthIndexes).find(
    (name) => monthIndexes[name] === month
  );
  return monthName ? `${day} ${monthName} ${year}` : date;
}
