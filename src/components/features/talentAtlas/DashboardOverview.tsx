import { Users, Megaphone, TrendingUp, Clock } from 'lucide-react';

const stats = [
  { label: 'Total Hired', value: '47', icon: Users },
  { label: 'Active Campaigns', value: '8', icon: Megaphone },
  { label: 'Hire Rate', value: '23.5%', icon: TrendingUp },
  { label: 'Avg Time to Hire', value: '38d', icon: Clock },
];

const campaigns = [
  { name: 'Senior Software Engineer', applicants: 12, progress: 75 },
  { name: 'Marketing Coordinator', applicants: 8, progress: 45 },
  { name: 'Program Officer', applicants: 5, progress: 30 },
];

const activity = [
  {
    text: 'New application received for Senior Software Engineer',
    time: '2h ago',
  },
  { text: 'Interview scheduled with Jane Doe', time: '5h ago' },
  {
    text: "Campaign 'Marketing Coordinator' reached 50% of its goal",
    time: '1d ago',
  },
  { text: 'New member joined the Berlin chapter', time: '2d ago' },
];

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your hiring activity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <Icon size={18} className="text-slate-400" />
              </div>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">
            Active Campaigns
          </h2>
          <ul className="mt-4 space-y-4">
            {campaigns.map((campaign) => (
              <li key={campaign.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {campaign.name}
                  </span>
                  <span className="text-slate-500">
                    {campaign.applicants} applicants
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-blue-600"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">
            Live Activity
          </h2>
          <ul className="mt-4 space-y-4">
            {activity.map((item) => (
              <li key={item.text} className="flex gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <div>
                  <p className="text-slate-700">{item.text}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
