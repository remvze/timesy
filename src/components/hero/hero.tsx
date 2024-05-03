import { Container } from '@/components/container';

import styles from './hero.module.css';

export function Hero() {
  return (
    <div className={styles.hero}>
      <Container>
        <h1 className={styles.title}>Timesy</h1>
        <p className={styles.desc}>A distraction-free online timer.</p>
      </Container>
    </div>
  );
}
