import { WebSocketServer, WebSocket } from 'ws';
import { TYPES, type WsEvent } from '@/types/ws.types';
import {
  MOCK_CAMPAIGNS,
  MOCK_CANDIDATES,
  MOCK_COMPANIES,
  MOCK_FEEDBACKS,
  DECISIONS,
} from '@/data/talentAtlasMockData';

const PORT = 4000;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running on ws://localhost:${PORT}`);

const clients = new Set<WebSocket>();
let eventCounter = 0;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function broadcast(event: WsEvent) {
  const message = JSON.stringify(event);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on('connection', (socket) => {
  clients.add(socket);
  console.log('Client connected. Total:', clients.size);

  socket.send(
    JSON.stringify({
      type: 'connected',
      payload: { message: 'Connected to TalentAtlas WebSocket server' },
      timestamp: Date.now(),
    } satisfies WsEvent),
  );

  socket.on('close', () => {
    clients.delete(socket);
    console.log('Client disconnected. Total:', clients.size);
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err.message);
    clients.delete(socket);
  });
});

// Simulate real events every 2 seconds
setInterval(() => {
  eventCounter++;

  const eventType = TYPES[eventCounter % 3];

  if (eventType === 'candidate_updated') {
    const candidate = pick(MOCK_CANDIDATES);
    broadcast({
      type: 'candidate_updated',
      eventId: `evt-${eventCounter}`,
      payload: {
        candidateId: candidate.id,
        candidateName: candidate.full_name,
        stage: candidate.stage,
        campaignId: candidate.campaign_id,
      },
      timestamp: Date.now(),
    });
  } else if (eventType === 'campaign_updated') {
    const campaign = pick(MOCK_CAMPAIGNS);
    broadcast({
      type: 'campaign_updated',
      eventId: `evt-${eventCounter}`,
      payload: {
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        applied_count: campaign.applied_count + Math.floor(Math.random() * 3),
        hired_count: campaign.hired_count,
      },
      timestamp: Date.now(),
    });
  } else {
    const candidate = pick(MOCK_CANDIDATES);
    const company = pick(MOCK_COMPANIES);
    broadcast({
      type: 'company_feedback',
      eventId: `evt-${eventCounter}`,
      payload: {
        candidateId: candidate.id,
        company: company.name,
        feedback: pick(MOCK_FEEDBACKS),
        decision: pick(DECISIONS),
      },
      timestamp: Date.now(),
    });
  }

  console.log(
    `Broadcast: ${eventType} [evt-${eventCounter}] to ${clients.size} client(s)`,
  );
}, 2000);

// Clean shutdown on Ctrl+C
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  wss.close(() => process.exit(0));
});
