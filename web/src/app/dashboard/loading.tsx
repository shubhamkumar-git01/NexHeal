export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Skeleton Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-200 rounded-xl border border-slate-100"></div>
        ))}
      </div>

      {/* Skeleton Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 h-96 bg-slate-200 rounded-xl border border-slate-100"></div>
        <div className="col-span-3 h-96 bg-slate-200 rounded-xl border border-slate-100"></div>
      </div>
    </div>
  );
}
