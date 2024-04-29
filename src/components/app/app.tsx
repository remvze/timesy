import { useState, useMemo } from 'react';
import { IoPlay } from 'react-icons/io5';

import { Container } from '@/components/container';

import { padNumber } from '@/helpers/number';

import styles from './app.module.css';

interface Timer {
  id: string;
  name: string;
  spent: number;
  total: number;
}

export function App() {
  const [name, setName] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  const totalSeconds = useMemo(
    () => hours * 60 * 60 + minutes * 60 + seconds,
    [hours, minutes, seconds],
  );

  const [timers, setTimers] = useState<Array<Timer>>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (totalSeconds === 0) return;

    setTimers(prev => [
      {
        id: Math.random().toString(),
        name,
        spent: 0,
        total: totalSeconds,
      },
      ...prev,
    ]);

    setName('');
  };

  return (
    <div className={styles.app}>
      <Container>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Field
            label="Session Name"
            optional
            type="text"
            value={name}
            onChange={value => setName(value as string)}
          />

          <div className={styles.timeFields}>
            <Field
              label="Hours"
              type="select"
              value={hours}
              onChange={value => setHours(value as number)}
            >
              {Array(13)
                .fill(null)
                .map((_, index) => (
                  <option key={`hour-${index}`} value={index}>
                    {index}
                  </option>
                ))}
            </Field>

            <Field
              label="Minutes"
              type="select"
              value={minutes}
              onChange={value => setMinutes(value as number)}
            >
              {Array(60)
                .fill(null)
                .map((_, index) => (
                  <option key={`minutes-${index}`} value={index}>
                    {index}
                  </option>
                ))}
            </Field>

            <Field
              label="Seconds"
              type="select"
              value={seconds}
              onChange={value => setSeconds(value as number)}
            >
              {Array(60)
                .fill(null)
                .map((_, index) => (
                  <option key={`seconds-${index}`} value={index}>
                    {index}
                  </option>
                ))}
            </Field>
          </div>

          <button className={styles.button} type="submit">
            Add Timer
          </button>
        </form>

        {timers.length > 0 && (
          <div className={styles.timers}>
            <h2 className={styles.title}>Timers</h2>
            {timers.map(timer => (
              <Timer
                key={timer.id}
                name={timer.name}
                spent={timer.spent}
                total={timer.total}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

interface TimerProps {
  name: string;
  spent: number;
  total: number;
}

function Timer({ name, spent, total }: TimerProps) {
  const left = useMemo(() => total - spent, [total, spent]);

  const hours = useMemo(() => Math.floor(left / 3600), [left]);
  const minutes = useMemo(() => Math.floor((left % 3600) / 60), [left]);
  const seconds = useMemo(() => left % 60, [left]);

  return (
    <div className={styles.timer}>
      <header className={styles.header}>
        <div className={styles.control}>
          <input className={styles.input} type="text" value={name} />
          <button className={styles.button}>
            <IoPlay />
          </button>
        </div>
      </header>

      <div className={styles.left}>
        {padNumber(hours)}:{padNumber(minutes)}:{padNumber(seconds)}
      </div>
    </div>
  );
}

interface FieldProps {
  children?: React.ReactNode;
  label: string;
  onChange: (value: string | number) => void;
  optional?: boolean;
  type: 'text' | 'select';
  value: string | number;
}

function Field({
  children,
  label,
  onChange,
  optional,
  type,
  value,
}: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={label.toLowerCase()}>
        {label}{' '}
        {optional && <span className={styles.optional}>(optional)</span>}
      </label>

      {type === 'text' && (
        <input
          className={styles.input}
          id={label.toLowerCase()}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}

      {type === 'select' && (
        <select
          className={styles.input}
          id={label.toLowerCase()}
          value={value}
          onChange={e => onChange(parseInt(e.target.value))}
        >
          {children}
        </select>
      )}
    </div>
  );
}
