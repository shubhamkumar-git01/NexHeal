export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Row Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-muted rounded-xl border border-border"></div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <div className="col-span-4 h-96 bg-muted rounded-xl border border-border"></div>
        <div className="col-span-3 h-96 bg-muted rounded-xl border border-border"></div>
      </div>
    </div>
  );
}
