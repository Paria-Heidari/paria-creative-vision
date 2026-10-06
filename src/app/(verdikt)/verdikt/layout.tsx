export default function VerdiktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-surface="workspace" className="flex min-h-screen">
      {/* Sidebar placeholder */}
      <aside className="w-64 border-r border-border bg-surface-muted p-6">
        <div className="mb-8 flex flex-col gap-1">
          <p className="font-semibold">Verdikt</p>
        </div>
        <nav className="flex flex-col gap-1 text-sm text-foreground-secondary">
          <a href="/verdikt/dashboard">Dashboard</a>
          <a href="/verdikt/decisions">All Decisions</a>
          <a href="/verdikt/decisions/new">New Decision</a>
          <a href="/verdikt/departments">Departments</a>
          <a href="/verdikt/settings">Settings</a>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
