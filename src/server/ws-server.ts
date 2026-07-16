import { WebSocketServer, WebSocket } from 'ws';
import { TYPES, type WsEvent } from '@/types/ws.types';
import {
  MOCK_CAMPAIGNS,
  MOCK_CANDIDATES,
  MOCK_COMPANIES,
  MOCK_FEEDBACKS,
  DECISIONS,
} from '@/data/talentAtlasMockData';

const PORT = Number(process.env.NEXT_PUBLIC_WS_PORT) || 4000;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running on ws://localhost:${PORT}`);

const clients = new Set<WebSocket>();
let eventCounter = 0;

// Tracks whether each client responded to the last ping.
// WeakMap avoids monkey-patching (socket.isAlive = true) the WebSocket object.
// WeakMap - sticky note we attach beside the object
const isAlive = new WeakMap<WebSocket, boolean>();
const HEARTBEAT_INTERVAL = 30_000;

// Randomly pick an item from an array
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Broadcast a WS event to all connected clients
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
  isAlive.set(socket, true);
  socket.on('pong', () => isAlive.set(socket, true));
  console.log('Client connected. Total:', clients.size);

  socket.send(
    JSON.stringify({
      type: 'connected',
      payload: { message: 'Connected to TalentAtlas WebSocket server' },
      timestamp: Date.now(),
    } satisfies WsEvent),
  );

  // Relay real events sent by API routes to all connected clients
  socket.on('message', (raw) => {
    try {
      const event = JSON.parse(raw.toString()) as WsEvent;
      broadcast(event);
    } catch {
      console.warn('[WS] Failed to parse client message:', raw.toString());
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log('Client disconnected. Total:', clients.size);
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err.message);
    clients.delete(socket);
  });
});

// Ping every client on an interval. If a client hasn't responded to the
// previous ping by the time the next one fires, it is silently dead — terminate it.
setInterval(() => {
  wss.clients.forEach((socket) => {
    if (!isAlive.get(socket)) {
      socket.terminate();
      return;
    }
    isAlive.set(socket, false);
    socket.ping();
  });
}, HEARTBEAT_INTERVAL);

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
}, 10000);

// Clean shutdown on Ctrl+C
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  wss.close(() => process.exit(0));
});
