"use client";

import { createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen, ClipboardCheck, FileText, GraduationCap, UserRound } from "lucide-react";
import { PageHeader } from "@/components/dashboard/pageHeader";
import { StudentPersonalProfileForm } from "@/components/students/studentPersonalProfileForm";
import type { StudentPersonalProfile } from "@/lib/validation/student";

type AcademicSummary = {
  rollNumber: string;
  className: string;
  boardName: string;
  schoolName: string;
  academicYear: string;
  admissionDate: string;
  learningMode: string;
  courseName: string;
  enrollmentStatus: string;
};
type Account = { name: string; avatar: string; email: string; studentContact: string; personalProfile: Record<string, string>; academic: AcademicSummary };
const emptyAcademic: AcademicSummary = { rollNumber: "", className: "", boardName: "", schoolName: "", academicYear: "", admissionDate: "", learningMode: "", courseName: "", enrollmentStatus: "" };
const AccountContext = createContext<Account>({ name: "Student", avatar: "", email: "", studentContact: "", personalProfile: {}, academic: emptyAcademic });

export function StudentAccountProvider({ children, name, avatar, email, studentContact, personalProfile, academic }: { children: React.ReactNode; name: string; avatar: string; email: string; studentContact: string; personalProfile: Record<string, string>; academic: AcademicSummary }) {
  return <AccountContext.Provider value={{ name: name || "Student", avatar, email, studentContact, personalProfile, academic }}>{children}</AccountContext.Provider>;
}

const routeInfo: Record<string, { title: string; subtitle: string }> = {
  "/student": { title: "Your learning, at a glance", subtitle: "Your current enrollment and profile details." },
  "/student/profile": { title: "My profile", subtitle: "Your academic record and personal information." },
  "/student/course": { title: "My course", subtitle: "Your current course enrollment." },
  "/student/materials": { title: "Study materials", subtitle: "Resources shared by the academy will appear here." },
  "/student/assignments": { title: "Assignments", subtitle: "Assignments published for your class will appear here." },
  "/student/results": { title: "Results", subtitle: "Your published examination results." },
};

const completionFields: Array<keyof StudentPersonalProfile> = ["dateOfBirth", "profilePictureUrl", "fatherName", "motherName", "parentOccupation", "parentEducation", "parentContact", "email", "address"];
const personalFields: Array<{ key: keyof StudentPersonalProfile; label: string }> = [
  { key: "dateOfBirth", label: "Date of birth" }, { key: "profilePictureUrl", label: "Profile picture URL" },
  { key: "fatherName", label: "Father's name" }, { key: "motherName", label: "Mother's name" },
  { key: "parentOccupation", label: "Parent occupation" }, { key: "parentEducation", label: "Parent education" },
  { key: "parentContact", label: "Parent contact" }, { key: "email", label: "Email address" }, { key: "address", label: "Address" },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border bg-card p-5 shadow-sm sm:p-6 ${className}`}>{children}</section>;
}
function Info({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-xl border px-3.5 py-3"><p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 break-words text-sm font-medium">{value || "Not available"}</p></div>;
}
function Empty({ title, detail }: { title: string; detail: string }) {
  return <div className="rounded-xl border border-dashed px-5 py-9 text-center"><p className="text-sm font-medium">{title}</p><p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{detail}</p></div>;
}
function ProfileCompletion({ profile }: { profile: Record<string, string> }) {
  const complete = completionFields.filter((field) => Boolean(profile[field]?.trim())).length;
  const percentage = Math.round((complete / completionFields.length) * 100);
  return <div className="rounded-xl border p-4">
    <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold">Profile completion</p><p className="text-sm text-muted-foreground">{percentage}% · {complete} of {completionFields.length} details</p></div>
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Profile completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percentage}%` }} /></div>
    {percentage < 100 && <p className="mt-2 text-xs text-muted-foreground">You can add or update these details now, or come back later.</p>}
  </div>;
}
function StudentCard({ title, value, detail, href, icon: Icon }: { title: string; value: string; detail: string; href: string; icon: typeof BookOpen }) {
  return <Link href={href} className="group rounded-2xl border bg-card p-5 shadow-sm transition hover:border-primary/25 hover:shadow-md">
    <div className="flex items-start justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-4" /></span><ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" /></div>
    <p className="mt-5 text-xs font-medium text-muted-foreground">{title}</p><p className="mt-1 text-lg font-semibold tracking-tight">{value || "Not available"}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p>
  </Link>;
}

export function StudentPage() {
  const account = useContext(AccountContext);
  const path = usePathname();
  const info = routeInfo[path] ?? routeInfo["/student"];
  const { academic, personalProfile, name, avatar, email, studentContact } = account;
  const profileValues = Object.fromEntries(personalFields.map(({ key }) => [key, personalProfile[key] ?? (key === "email" ? email : "")])) as Record<keyof StudentPersonalProfile, string>;

  return <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
    <PageHeader title={info.title} description={info.subtitle} />
    {path === "/student" && <>
      <section className="relative overflow-hidden rounded-2xl bg-primary px-6 py-7 text-primary-foreground sm:px-8 sm:py-9">
        <div className="absolute -right-12 -top-20 size-64 rounded-full border border-white/10" aria-hidden="true" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div><p className="text-sm text-white/70">Welcome back,</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">{name}</h2><p className="mt-3 max-w-lg text-sm leading-6 text-white/70">{[academic.className, academic.boardName, academic.academicYear].filter(Boolean).join(" · ") || "Your current academic information is shown below."}</p></div>
          <div className="flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 text-xl font-semibold">{avatar ? <img src={avatar} alt="Student profile" className="size-full object-cover" /> : name.slice(0, 1).toUpperCase()}</div>
        </div>
      </section>
      <ProfileCompletion profile={personalProfile} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StudentCard title="Enrolled course" value={academic.courseName} detail={academic.enrollmentStatus ? `Enrollment ${academic.enrollmentStatus}` : "Current enrollment"} icon={BookOpen} href="/student/course" />
        <StudentCard title="Class and board" value={[academic.className, academic.boardName].filter(Boolean).join(" · ")} detail={academic.academicYear || "Current academic year"} icon={GraduationCap} href="/student/profile" />
        <StudentCard title="Profile" value="Personal details" detail="Add or update your information" icon={UserRound} href="/student/profile" />
      </div>
      <Panel><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="font-semibold">Current academic information</h2><Link href="/student/profile" className="text-sm font-medium text-primary hover:underline">View profile</Link></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Info label="Roll number" value={academic.rollNumber} /><Info label="Class" value={academic.className} /><Info label="Board" value={academic.boardName} /><Info label="School" value={academic.schoolName} /><Info label="Academic year" value={academic.academicYear} /><Info label="Admission date" value={academic.admissionDate} /><Info label="Learning mode" value={academic.learningMode} /><Info label="Course" value={academic.courseName} /></div></Panel>
      <div className="grid gap-5 lg:grid-cols-3"><Panel><h2 className="mb-3 font-semibold">Study materials</h2><Empty title="No materials published" detail="Materials will appear here when the academy shares them for your class or course." /></Panel><Panel><h2 className="mb-3 font-semibold">Assignments</h2><Empty title="No assignments published" detail="Class assignments will appear here when they are available." /></Panel><Panel><h2 className="mb-3 font-semibold">Results</h2><Empty title="No results published" detail="Your examination results will appear here after publication." /></Panel></div>
      {completionFields.some((field) => !personalProfile[field]?.trim()) && <p className="text-center text-sm text-muted-foreground">You can complete your profile later from <Link className="font-medium text-primary hover:underline" href="/student/profile">My Profile</Link>.</p>}
    </>}
    {path === "/student/profile" && <>
      <ProfileCompletion profile={personalProfile} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel><h2 className="mb-4 text-base font-semibold">Academic information · managed by the academy</h2><div className="grid gap-3 sm:grid-cols-2"><Info label="Student name" value={name} /><Info label="Generated roll number" value={academic.rollNumber} /><Info label="Class" value={academic.className} /><Info label="Board" value={academic.boardName} /><Info label="School" value={academic.schoolName} /><Info label="Academic year" value={academic.academicYear} /><Info label="Admission date" value={academic.admissionDate} /><Info label="Learning mode" value={academic.learningMode} /><Info label="Course" value={academic.courseName} /></div></Panel>
        <Panel><div className="mb-5 flex items-center gap-3 rounded-xl bg-muted/60 p-4"><div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-secondary text-primary">{avatar ? <img src={avatar} alt="Profile" className="size-full object-cover" /> : <UserRound className="size-5" />}</div><div><p className="text-sm font-semibold">{name}</p><p className="text-xs text-muted-foreground">Personal information</p></div></div><div className="mb-5"><Info label="Student contact · managed by the academy" value={studentContact} /></div><StudentPersonalProfileForm initialValues={profileValues} /></Panel>
      </div>
      <Link href="/student" className="inline-flex text-sm font-medium text-primary hover:underline">Complete later and return to dashboard</Link>
    </>}
    {path === "/student/course" && <Panel><div className="mb-4 flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><GraduationCap className="size-5" /></span><div><h2 className="font-semibold">Course enrollment</h2><p className="text-sm text-muted-foreground">Your current course information</p></div></div><div className="grid gap-3 sm:grid-cols-2"><Info label="Course" value={academic.courseName} /><Info label="Status" value={academic.enrollmentStatus} /><Info label="Class" value={academic.className} /><Info label="Academic year" value={academic.academicYear} /></div><div className="mt-5"><Empty title="No course resources published" detail="Course resources and assignments will appear here when the academy publishes them." /></div></Panel>}
    {path === "/student/materials" && <Panel><div className="mb-4 flex items-center gap-3"><FileText className="size-5 text-primary" /><h2 className="font-semibold">Study materials</h2></div><Empty title="No materials published" detail="Study materials are not connected to student records yet. Academy-published resources will appear here when available." /></Panel>}
    {path === "/student/assignments" && <Panel><div className="mb-4 flex items-center gap-3"><ClipboardCheck className="size-5 text-primary" /><h2 className="font-semibold">Assignments</h2></div><Empty title="No assignments published" detail="Assignments are not connected to student records yet. Your class assignments will appear here when available." /></Panel>}
    {path === "/student/results" && <Panel><h2 className="mb-3 font-semibold">Examination results</h2><Empty title="No results published" detail="Your results will appear here when the academy publishes them to your account." /></Panel>}
  </div>;
}
