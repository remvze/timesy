import { Container } from '@/components/container';
import { Form } from '@/components/form';
import { Timers } from '@/components/timers';
import { StoreConsumer } from '@/components/store-consumer';

export function App() {
  return (
    <StoreConsumer>
      <Container>
        <Form />
        <Timers />
      </Container>
    </StoreConsumer>
  );
}
