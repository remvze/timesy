import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

interface Timer {
  id: string;
  name: string;
  spent: number;
  total: number;
}

interface State {
  timers: Array<Timer>;
}

interface Actions {
  add: (timer: { name: string; total: number }) => void;
  getTimer: (id: string) => Timer;
  rename: (id: string, newName: string) => void;
  tick: (id: string) => void;
}

export const useTimers = create<State & Actions>()((set, get) => ({
  add({ name, total }) {
    set(state => ({
      timers: [
        {
          id: uuid(),
          isRunning: false,
          name,
          spent: 0,
          total,
        },
        ...state.timers,
      ],
    }));
  },

  getTimer(id) {
    return get().timers.filter(timer => timer.id === id)[0];
  },

  rename(id, newName) {
    set(state => ({
      timers: state.timers.map(timer => {
        if (timer.id !== id) return timer;

        return { ...timer, name: newName };
      }),
    }));
  },

  tick(id) {
    set(state => ({
      timers: state.timers.map(timer => {
        if (timer.id !== id) return timer;

        return { ...timer, spent: timer.spent + 1 };
      }),
    }));
  },

  timers: [],
}));
