import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  volume: number;
}

interface Actions {
  setVolume: (volume: number) => void;
}

export const useSettings = create<State & Actions>()(
  persist(
    set => ({
      setVolume(volume) {
        set({ volume });
      },

      volume: 0.5,
    }),
    {
      name: 'timesy-settings',
      partialize: state => ({
        volume: state.volume,
      }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
