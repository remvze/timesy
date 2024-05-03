import { useState, useMemo, useEffect, useRef } from 'react';
import { IoPlay, IoPause, IoRefresh } from 'react-icons/io5';

import { Container } from '@/components/container';

import { padNumber } from '@/helpers/number';
import { useTimers } from '@/stores/timers';
import { cn } from '@/helpers/styles';

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

  const timers = useTimers(state => state.timers);
  const add = useTimers(state => state.add);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (totalSeconds === 0) return;

    add({
      name,
      total: totalSeconds,
    });

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
            <header>
              <h2 className={styles.title}>Timers</h2>
              <div className={styles.line} />
            </header>

            {timers.map(timer => (
              <Timer id={timer.id} key={timer.id} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

interface TimerProps {
  id: string;
}

function Timer({ id }: TimerProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isRunning, setIsRunning] = useState(false);

  const { name, spent, total } = useTimers(state => state.getTimer(id));
  const tick = useTimers(state => state.tick);
  const rename = useTimers(state => state.rename);
  const reset = useTimers(state => state.reset);

  const left = useMemo(() => total - spent, [total, spent]);

  const hours = useMemo(() => Math.floor(left / 3600), [left]);
  const minutes = useMemo(() => Math.floor((left % 3600) / 60), [left]);
  const seconds = useMemo(() => left % 60, [left]);

  const handleStart = () => {
    if (left > 0) setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleToggle = () => {
    if (isRunning) handlePause();
    else handleStart();
  };

  const handleReset = () => {
    setIsRunning(false);
    reset(id);
  };

  useEffect(() => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => tick(id), 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, tick, id]);

  useEffect(() => {
    if (left === 0 && isRunning) {
      setIsRunning(false);

      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [left, isRunning]);

  return (
    <div className={styles.timer}>
      <header className={styles.header}>
        <div className={styles.bar}>
          <div
            className={styles.completed}
            style={{ width: `${(left / total) * 100}%` }}
          />
        </div>
      </header>

      <div className={styles.left}>
        {padNumber(hours)}
        <span>:</span>
        {padNumber(minutes)}
        <span>:</span>
        {padNumber(seconds)}
      </div>

      <footer className={styles.footer}>
        <div className={styles.control}>
          <input
            className={cn(styles.input, left === 0 && styles.finished)}
            placeholder="Untitled"
            type="text"
            value={name}
            onChange={e => rename(id, e.target.value)}
          />

          <button
            className={cn(styles.button, styles.reset)}
            disabled={isRunning || spent === 0}
            onClick={handleReset}
          >
            <IoRefresh />
          </button>

          <button className={styles.button} onClick={handleToggle}>
            {isRunning ? <IoPause /> : <IoPlay />}
          </button>
        </div>
      </footer>
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
