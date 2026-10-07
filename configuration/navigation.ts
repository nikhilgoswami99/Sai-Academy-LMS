import {
  LayoutDashboard,
  Users,
  UserRound,
  Layers,
  BookOpen,
  ClipboardCheck,
  FileText,
  IndianRupee,
  Settings,
  CalendarCheck,
} from "lucide-react";

export type UserRole = "admin" | "teacher" | "student";

export const navigation = {
  admin: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: Users,
    },
    {
      title: "Teachers",
      url: "/admin/teachers",
      icon: UserRound,
    },
    {
      title: "Batches",
      url: "/admin/batches",
      icon: Layers,
    },
    {
      title: "Classes",
      url: "/admin/classes",
      icon: BookOpen,
    },
    {
      title: "Exams",
      url: "/admin/exams",
      icon: ClipboardCheck,
    },
    {
      title: "Results",
      url: "/admin/results",
      icon: FileText,
    },
    {
      title: "Attendance",
      url: "/admin/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Fees",
      url: "/admin/fees",
      icon: IndianRupee,
    },
  ],

  teacher: [
    {
      title: "Dashboard",
      url: "/teacher",
      icon: LayoutDashboard,
    },
    {
      title: "My Students",
      url: "/teacher/students",
      icon: Users,
    },
    {
      title: "My Batches",
      url: "/teacher/batches",
      icon: Layers,
    },
    {
      title: "Attendance",
      url: "/teacher/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Exams",
      url: "/teacher/exams",
      icon: ClipboardCheck,
    },
    {
      title: "Results",
      url: "/teacher/results",
      icon: FileText,
    },
  ],

  student: [
    {
      title: "Dashboard",
      url: "/student",
      icon: LayoutDashboard,
    },
    {
      title: "My Classes",
      url: "/student/classes",
      icon: BookOpen,
    },
    {
      title: "Attendance",
      url: "/student/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Results",
      url: "/student/results",
      icon: FileText,
    },
    {
      title: "Fees",
      url: "/student/fees",
      icon: IndianRupee,
    },
  ],
} satisfies Record<UserRole, readonly unknown[]>;