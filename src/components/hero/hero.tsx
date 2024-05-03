import { Container } from '@/components/container';

import styles from './hero.module.css';

export function Hero() {
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.titleContainer}>
          <img
            alt="Timesy Logo"
            className={styles.logo}
            height={35}
            src="/logo.svg"
            width={30.31}
          />

          <h1 className={styles.title}>Timesy</h1>
        </div>
        <p className={styles.desc}>A distraction-free online timer.</p>
      </Container>
    </div>
  );
}
