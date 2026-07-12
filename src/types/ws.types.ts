// Pool for ws-server.ts's random simulator only. candidate_created (real POSTs)
// and connected (per-socket handshake) are triggered elsewhere and don't belong here.
export const TYPES = [
  'candidate_updated',
  'campaign_updated',
  'company_feedback',
] as const;

export type CandidateCreatedEvent = {
  type: 'candidate_created';
  eventId: string;
  payload: {
    candidateId: string;
    fullName: string;
    email: string;
    stage: string;
    campaignId: string;
  };
  timestamp: number;
};

export type CandidateUpdatedEvent = {
  type: 'candidate_updated';
  eventId: string;
  payload: {
    candidateId: string;
    candidateName: string;
    stage: string;
    campaignId: string;
  };
  timestamp: number;
};

export type CampaignUpdatedEvent = {
  type: 'campaign_updated';
  eventId: string;
  payload: {
    campaignId: string;
    campaignTitle: string;
    applied_count: number;
    hired_count: number;
  };
  timestamp: number;
};

export type CompanyFeedbackEvent = {
  type: 'company_feedback';
  eventId: string;
  payload: {
    candidateId: string;
    company: string;
    feedback: string;
    decision: 'proceed' | 'hold';
  };
  timestamp: number;
};

export type ConnectedEvent = {
  type: 'connected';
  payload: { message: string };
  timestamp: number;
};

export type WsEvent =
  | CandidateCreatedEvent
  | CandidateUpdatedEvent
  | CampaignUpdatedEvent
  | CompanyFeedbackEvent
  | ConnectedEvent;
