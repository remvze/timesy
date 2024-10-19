import { cn } from '@/helpers/styles';
import styles from './container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Container({ children, fullWidth }: ContainerProps) {
  return (
    <div className={cn(styles.container, fullWidth && styles.fullWidth)}>
      {children}
    </div>
  );
}
