import { useState, useMemo } from 'react';
import { IoMdSettings } from 'react-icons/io';

import { Modal } from '../modal';
import { Field } from './field';

import { useTimers } from '@/stores/timers';

import styles from './form.module.css';
import { useSettings } from '@/stores/settings';

interface FormProps {
  onTimerNameChange: (name: string) => void;
  timerName: string;
}

export function Form({ onTimerNameChange, timerName }: FormProps) {
  const [showSettings, setShowSettings] = useState(false);

  const volume = useSettings(state => state.volume);
  const setVolume = useSettings(state => state.setVolume);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [autoStart, setAutoStart] = useState(false);

  const totalSeconds = useMemo(
    () => hours * 60 * 60 + minutes * 60 + seconds,
    [hours, minutes, seconds],
  );

  const add = useTimers(state => state.add);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (totalSeconds === 0) return;

    add({
      autoStart,
      name: timerName,
      total: totalSeconds,
    });

    onTimerNameChange('');
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          label="Timer Name"
          optional
          type="text"
          value={timerName}
          onChange={value => onTimerNameChange(value as string)}
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

        <div className={styles.autoStart}>
          <label>
            <input
              checked={autoStart}
              type="checkbox"
              onChange={() => setAutoStart(prev => !prev)}
            />
            <span>Auto start the timer.</span>
          </label>
        </div>

        <div className={styles.buttons}>
          <button className={styles.primary} type="submit">
            Add Timer
          </button>
          <button type="button" onClick={() => setShowSettings(true)}>
            <IoMdSettings />
          </button>
        </div>
      </form>

      <Modal show={showSettings} onClose={() => setShowSettings(false)}>
        <div className={styles.settings}>
          <h2>Settings</h2>

          <div className={styles.field}>
            <label htmlFor="volume">Volume</label>
            <input
              max={1}
              min={0}
              step={0.1}
              type="range"
              value={volume}
              onChange={e => setVolume(+e.target.value)}
            />
          </div>

          <div className={styles.notice}>
            <strong>Notice:</strong> Changes to these settings will affect all
            timers and are saved automatically.
          </div>
        </div>
      </Modal>
    </>
  );
}
