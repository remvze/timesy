import { useCallback, useEffect } from 'react';

import { useSound } from './use-sound';
import { useAlarmStore } from '@/stores/alarm';
import { useSettings } from '@/stores/settings';

export function useAlarm() {
  const { play: playSound, setVolume } = useSound('/sounds/alarm.mp3', 1);
  const isPlaying = useAlarmStore(state => state.isPlaying);
  const play = useAlarmStore(state => state.play);
  const stop = useAlarmStore(state => state.stop);

  const volume = useSettings(state => state.volume);

  useEffect(() => {
    setVolume(volume);
  }, [volume, setVolume]);

  const playAlarm = useCallback(() => {
    if (!isPlaying) {
      playSound(stop);
      play();
    }
  }, [isPlaying, playSound, play, stop]);

  return playAlarm;
}
