import { useEffect } from 'react';

import { useTimers } from '@/stores/timers';
import { useSettings } from '@/stores/settings';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useTimers.persist.rehydrate();
    useSettings.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
