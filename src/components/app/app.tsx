import { Container } from '@/components/container';
import { Form } from '@/components/form';
import { Timers } from '@/components/timers';

import styles from './app.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <Container>
        <Form />
        <Timers />
      </Container>
    </div>
  );
}
