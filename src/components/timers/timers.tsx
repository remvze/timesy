import { useMemo } from 'react';

import { Timer } from './timer';

import { useTimers } from '@/stores/timers';

import styles from './timers.module.css';

export function Timers() {
  const timers = useTimers(state => state.timers);
  const total = useTimers(state => state.total());

  const trackedMinutes = useMemo(() => Math.floor(total / 60), [total]);

  return timers.length > 0 ? (
    <div className={styles.timers}>
      <header>
        <h2 className={styles.title}>Timers</h2>
        <div className={styles.line} />
        <p className={styles.spent}>
          {trackedMinutes} Minute{trackedMinutes !== 1 && 's'} Tracked
        </p>
      </header>

      {timers.map(timer => (
        <Timer id={timer.id} key={timer.id} />
      ))}
    </div>
  ) : null;
}
