import { useEffect } from 'react';

import { useTimers } from '@/stores/timers';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useTimers.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
