import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface Occurrence {
  origin: string;
  platform: string;
  unitValue: number;
  receivedAt: string;
}

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        setIsConnected(true);
        toast.success('WebSocket connected');
      };

      ws.onclose = () => {
        setIsConnected(false);
        toast.error('WebSocket disconnected');
        // Attempt to reconnect after 5 seconds
        setTimeout(connect, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast.error('WebSocket error occurred');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as Occurrence;
          setOccurrences((prev) => [data, ...prev].slice(0, 20)); // Keep last 100 occurrences
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      // setSocket(ws);

      return () => {
        ws.close();
      };
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect to WebSocket');
    }
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      socket?.close();
    };
  }, [connect]);

  return { isConnected, occurrences };
}