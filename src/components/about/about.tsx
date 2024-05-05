import { Container } from '@/components/container';

import styles from './about.module.css';

export function About() {
  return (
    <section className={styles.about}>
      <Container>
        <h2 className={styles.title}>What is Timesy?</h2>
        <p className={styles.desc}>
          Timesy is a free, open-source online timer designed to maximize focus
          and eliminate distractions. Run multiple timers simultaneously and
          store them locally for persistence across sessions. Whether
          you&apos;re a student, professional, or just someone who needs to stay
          on track, Timesy can help you achieve your goals.
        </p>
      </Container>
    </section>
  );
}
