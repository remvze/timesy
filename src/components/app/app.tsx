import { useState } from 'react';

import { Container } from '@/components/container';
import { Form } from '@/components/form';
import { Timers } from '@/components/timers';
import { StoreConsumer } from '@/components/store-consumer';
import { SnackbarProvider } from '@/contexts/snackbar';
import { PomodoroTimer } from '../pomodoro';

import styles from './app.module.css';
import { cn } from '@/helpers/styles';

export function App() {
  const [tab, setTab] = useState('countdown');
  const [timerName, setTimerName] = useState('');

  return (
    <SnackbarProvider>
      <StoreConsumer>
        <Container>
          <div className={styles.tabs}>
            <button
              className={cn(
                styles.countdown,
                tab === 'countdown' && styles.active,
              )}
              onClick={() => setTab('countdown')}
            >
              Countdown
            </button>
            <div className={styles.divider} />
            <button
              className={cn(
                styles.pomodoro,
                tab === 'pomodoro' && styles.active,
              )}
              onClick={() => setTab('pomodoro')}
            >
              Pomodoro
            </button>
          </div>

          {tab === 'countdown' && (
            <>
              <Form timerName={timerName} onTimerNameChange={setTimerName} />
              <Timers />
            </>
          )}

          {tab === 'pomodoro' && <PomodoroTimer />}
        </Container>
      </StoreConsumer>
    </SnackbarProvider>
  );
}
