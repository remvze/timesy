import { Container } from '@/components/container';

import styles from './footer.module.css';

export function Footer() {
  return (
    <Container>
      <footer className={styles.footer}>
        <p className={styles.line}>
          Source code on <a href="https://github.com/remvze/timesy">GitHub</a>
        </p>

        <p className={styles.line}>
          Created by <a href="https://twitter.com/remvze">MAZE ✦</a>
        </p>
      </footer>
    </Container>
  );
}
