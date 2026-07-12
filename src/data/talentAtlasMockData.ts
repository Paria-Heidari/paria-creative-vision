export const STAGES = ['applied', 'screening', 'interview', 'hired'] as const;

export const MOCK_CAMPAIGNS = [
  {
    id: '1',
    title: 'Berlin Backend Engineer',
    status: 'active',
    applied_count: 12,
    hired_count: 2,
    partner_company: 'SAP SE',
  },
  {
    id: '2',
    title: 'Paris Data Science',
    status: 'active',
    applied_count: 8,
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
];

export const MOCK_CANDIDATES = [
  {
    id: '1',
    full_name: 'Eric',
    email: 'eric@example.com',
    stage: 'interview',
    campaign_id: '1',
  },
  {
    id: '2',
    full_name: 'Mathias',
    email: 'mathias@example.com',
    stage: 'screening',
    campaign_id: '1',
  },
  {
    id: '3',
    full_name: 'Sarah',
    email: 'sarah@example.com',
    stage: 'applied',
    campaign_id: '2',
  },
  {
    id: '4',
    full_name: 'John',
    email: 'john@example.com',
    stage: 'applied',
    campaign_id: '2',
  },
];

export const MOCK_COMPANIES = [
  { id: '1', name: 'SAP SE', location: 'Berlin', open_campaigns: 1 },
  { id: '2', name: 'BNP Paribas', location: 'Paris', open_campaigns: 1 },
];

export const MOCK_FEEDBACKS = [
  'Strong technical background, good cultural fit.',
  'Impressive portfolio but lacks relevant experience.',
  'Excellent communication skills, strong problem-solver.',
  'Needs more experience in the required tech stack.',
] as const;

export const DECISIONS = ['proceed', 'hold'] as const;
