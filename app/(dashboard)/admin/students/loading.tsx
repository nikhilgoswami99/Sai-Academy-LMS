export default function StudentsLoading() {
  return <div className="space-y-6 p-6" aria-label="Loading student records">
    <div className="space-y-2"><div className="h-8 w-40 animate-pulse rounded bg-muted" /><div className="h-4 w-64 animate-pulse rounded bg-muted" /></div>
    <div className="flex justify-end"><div className="h-9 w-32 animate-pulse rounded-lg bg-muted" /></div>
    <div className="rounded-xl border bg-card p-4"><div className="mb-4 h-9 max-w-md animate-pulse rounded-lg bg-muted" /><div className="h-64 animate-pulse rounded-lg bg-muted" /></div>
  </div>;
}
