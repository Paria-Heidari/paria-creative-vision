'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { WsEvent } from '@/types/ws.types';

interface UseWebSocketOptions {
  url: string;
  onEvent: (event: WsEvent) => void;
  enabled?: boolean;
}

export function useWebSocket({
  url,
  onEvent,
  enabled = true,
}: UseWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectDelay = useRef(1000);
  const isCleaningRef = useRef(false);

  const onEventRef = useRef(onEvent);
  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  const connect = useCallback(() => {
    if (!enabled) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('[WS] Connected');
      reconnectDelay.current = 1000; // reset backoff on successful connection
    };

    ws.onmessage = (messageEvent) => {
      try {
        const event = JSON.parse(messageEvent.data) as WsEvent;
        onEventRef.current(event);
      } catch {
        console.warn('[WS] Failed to parse message:', messageEvent.data);
      }
    };

    ws.onclose = () => {
      // skip reconnect if we closed intentionally (unmount or StrictMode)
      if (isCleaningRef.current) return;
      console.log(
        `[WS] Disconnected. Reconnecting in ${reconnectDelay.current}ms...`,
      );
      // exponential backoff: 1s → 2s → 4s → 8s → max 30s
      setTimeout(() => {
        reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30_000);
        connect();
      }, reconnectDelay.current);
    };

    ws.onerror = () => {
      if (isCleaningRef.current) return;
      console.error('[WS] Error: could not connect to', url);
      ws.close(); // triggers onclose → reconnect
    };
  }, [url, enabled]);

  useEffect(() => {
    isCleaningRef.current = false; // reset flag on remount (StrictMode)
    connect();

    return () => {
      isCleaningRef.current = true;
      wsRef.current?.close();
    };
  }, [connect]);
}
