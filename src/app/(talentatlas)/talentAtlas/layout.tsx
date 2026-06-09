export default function TalentAtlasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-gray-200 p-6">
        <div className="mb-8 flex flex-col gap-1">
          <p className="font-semibold">Talent Atlas</p>
        </div>
        <nav className="flex flex-col gap-1 text-gray-600">
          <a href="/talentAtlas/dashboard">Dashboard</a>
          <a href="/talentAtlas/members">Members</a>
          </nav>
        </aside>
      <main className=" p-8">
        {children}
      </main>
    </div>
  );
}
