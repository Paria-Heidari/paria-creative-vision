export const STAGES = [
  'applied',
  'screening',
  'interview',
  'hired',
  'on_hold',
] as const;

export type Stage = (typeof STAGES)[number];

export const STAGE_LABELS: Record<Stage, string> = {
  applied: 'Applied',
  screening: 'Screening',
  interview: 'Interview',
  hired: 'Hired',
  on_hold: 'Maybe Another Time',
};

export const STAGE_COLORS: Record<Stage, { header: string }> = {
  applied: { header: 'bg-blue-50 text-blue-700 border-blue-200' },
  screening: { header: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  interview: { header: 'bg-purple-50 text-purple-700 border-purple-200' },
  hired: { header: 'bg-green-50 text-green-700 border-green-200' },
  on_hold: { header: 'bg-slate-100 text-slate-500 border-slate-200' },
};

export const MOCK_CAMPAIGNS = [
  {
    id: '1',
    title: 'Berlin Backend Engineer',
    status: 'active',
    applied_count: 5,
    hired_count: 1,
    partner_company: 'SAP SE',
  },
  {
    id: '2',
    title: 'Paris Data Science',
    status: 'active',
    applied_count: 4,
    hired_count: 1,
    partner_company: 'BNP Paribas',
  },
  {
    id: '3',
    title: 'London UX Design',
    status: 'draft',
    applied_count: 0,
    hired_count: 0,
    partner_company: null,
  },
  {
    id: '4',
    title: 'Amsterdam Frontend Engineer',
    status: 'active',
    applied_count: 3,
    hired_count: 0,
    partner_company: 'Booking.com',
  },
];

export const MOCK_CANDIDATES = [
  {
    id: '1',
    full_name: 'Eric Weber',
    email: 'eric.weber@example.com',
    stage: 'hired',
    campaign_id: '1',
  },
  {
    id: '2',
    full_name: 'Mathias Bauer',
    email: 'mathias.bauer@example.com',
    stage: 'interview',
    campaign_id: '1',
  },
  {
    id: '3',
    full_name: 'Lena Hoffmann',
    email: 'lena.hoffmann@example.com',
    stage: 'screening',
    campaign_id: '1',
  },
  {
    id: '4',
    full_name: 'Thomas Müller',
    email: 'thomas.muller@example.com',
    stage: 'applied',
    campaign_id: '1',
  },
  {
    id: '5',
    full_name: 'Julia Schneider',
    email: 'julia.schneider@example.com',
    stage: 'applied',
    campaign_id: '1',
  },
  // Campaign 2
  {
    id: '6',
    full_name: 'Sarah Martin',
    email: 'sarah.martin@example.com',
    stage: 'hired',
    campaign_id: '2',
  },
  {
    id: '7',
    full_name: 'Pierre Dupont',
    email: 'pierre.dupont@example.com',
    stage: 'interview',
    campaign_id: '2',
  },
  {
    id: '8',
    full_name: 'Marie Laurent',
    email: 'marie.laurent@example.com',
    stage: 'screening',
    campaign_id: '2',
  },
  {
    id: '9',
    full_name: 'Jean-Paul Bernard',
    email: 'jp.bernard@example.com',
    stage: 'applied',
    campaign_id: '2',
  },
  // Campaign 4
  {
    id: '10',
    full_name: 'Lars Eriksson',
    email: 'lars.eriksson@example.com',
    stage: 'interview',
    campaign_id: '4',
  },
  {
    id: '11',
    full_name: 'Emma de Vries',
    email: 'emma.devries@example.com',
    stage: 'applied',
    campaign_id: '4',
  },
  {
    id: '12',
    full_name: 'Noah van der Berg',
    email: 'noah.vdberg@example.com',
    stage: 'applied',
    campaign_id: '4',
  },
  {
    id: '13',
    full_name: 'Anna Fischer',
    email: 'anna.fischer@example.com',
    stage: 'on_hold',
    campaign_id: '1',
  },
];

export const MOCK_COMPANIES = [
  { id: '1', name: 'SAP SE', location: 'Berlin', open_campaigns: 1 },
  { id: '2', name: 'BNP Paribas', location: 'Paris', open_campaigns: 1 },
  { id: '3', name: 'Booking.com', location: 'Amsterdam', open_campaigns: 1 },
];

export const MOCK_FEEDBACKS = [
  'Strong technical background, good cultural fit.',
  'Impressive portfolio but lacks relevant experience.',
  'Excellent communication skills, strong problem-solver.',
  'Needs more experience in the required tech stack.',
] as const;

export const DECISIONS = ['proceed', 'hold'] as const;
