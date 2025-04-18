'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Only assign Pusher to window in browser environments
if (typeof window !== 'undefined') {
  window.Pusher = Pusher;
}

type EchoType = Echo<'reverb'>;

interface EchoContextType {
  echo: EchoType | null;
}

const appKey = process.env.NEXT_PUBLIC_REVERB_APP_KEY;
const appId = process.env.NEXT_PUBLIC_REVERB_APP_ID;
const host = process.env.NEXT_PUBLIC_REVERB_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_REVERB_PORT;
const forceTLS =
  (process.env.NEXT_PUBLIC_REVERB_FORCE_TLS || 'false') === 'true';

const EchoContext = createContext<EchoContextType | undefined>(undefined);

export const EchoProvider = ({ children }: { children: ReactNode }) => {
  const [echo, setEcho] = useState<EchoType | null>(null);

  useEffect(() => {
    const reverb = new Echo({
      broadcaster: 'reverb',
      key: appKey,
      wsHost: host,
      ...(port && { wsPort: port }),
      ...(port && { wssPort: port }),
      forceTLS: forceTLS,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: '/api/broadcasting/auth',
      app: {
        id: appId,
        key: appKey,
      },
    });

    setEcho(reverb);

    return () => {
      reverb.disconnect();
    };
  }, []);

  return (
    <EchoContext.Provider value={{ echo }}>{children}</EchoContext.Provider>
  );
};

export const useEcho = () => {
  const context = useContext(EchoContext);
  if (!context) {
    throw new Error('useEcho must be used within EchoProvider');
  }
  return context;
};

export const useModelUpdates = () => {
  const { echo } = useEcho();

  const [modelUpdates, setModelUpdates] = useState<{
    type: string;
    id: string;
  }>();

  useEffect(() => {
    if (!echo) return;

    const channel = echo.channel('model');
    channel.listen('.model.updated', (e: { type: string; id: string }) => {
      setModelUpdates(e);
    });

    return () => {
      channel.stopListening('.model.updated');
    };
  }, [echo]);

  return modelUpdates;
};
