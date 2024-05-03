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
  total: () => number;
}

interface Actions {
  add: (timer: { name: string; total: number }) => void;
  delete: (id: string) => void;
  getTimer: (id: string) => Timer;
  rename: (id: string, newName: string) => void;
  reset: (id: string) => void;
  tick: (id: string) => void;
}

export const useTimers = create<State & Actions>()((set, get) => ({
  add({ name, total }) {
    set(state => ({
      timers: [
        {
          id: uuid(),
          name,
          spent: 0,
          total,
        },
        ...state.timers,
      ],
    }));
  },

  delete(id) {
    set(state => ({
      timers: state.timers.filter(timer => timer.id !== id),
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

  reset(id) {
    set(state => ({
      timers: state.timers.map(timer => {
        if (timer.id !== id) return timer;

        return { ...timer, spent: 0 };
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

  total() {
    return get().timers.reduce((prev, curr) => prev + curr.spent, 0);
  },
}));
