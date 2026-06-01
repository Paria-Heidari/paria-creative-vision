export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {[
          'Total Decisions',
          'Approval Rate',
          'Avg Time to Decide',
          'Overdue',
        ].map((kpi) => (
          <div key={kpi} className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">{kpi}</p>
            <p className="mt-1 text-2xl font-semibold">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}
