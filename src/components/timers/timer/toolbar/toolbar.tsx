import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { useTimers } from '@/stores/timers';

import styles from './toolbar.module.css';

interface ToolbarProps {
  id: string;
}

export function Toolbar({ id }: ToolbarProps) {
  const moveUp = useTimers(state => state.moveUp);
  const moveDown = useTimers(state => state.moveDown);

  return (
    <div className={styles.toolbar}>
      <button
        onClick={e => {
          e.stopPropagation();
          moveUp(id);
        }}
      >
        <IoIosArrowUp />
      </button>
      <button
        onClick={e => {
          e.stopPropagation();
          moveDown(id);
        }}
      >
        <IoIosArrowDown />
      </button>
    </div>
  );
}
