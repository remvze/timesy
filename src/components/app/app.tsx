import { Container } from '@/components/container';
// import { Form } from '@/components/form';
// import { Timers } from '@/components/timers';
import { StoreConsumer } from '@/components/store-consumer';
import { SnackbarProvider } from '@/contexts/snackbar';
import { PomodoroTimer } from '../pomodoro';

export function App() {
  return (
    <SnackbarProvider>
      <StoreConsumer>
        <Container>
          {/* <Form /> */}
          {/* <Timers /> */}
          <PomodoroTimer />
        </Container>
      </StoreConsumer>
    </SnackbarProvider>
  );
}
