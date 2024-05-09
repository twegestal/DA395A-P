import { MantineProvider } from '@mantine/core';
import { Router } from './Router';

export const App = () => {
  return (
    <>
      <MantineProvider>
        <Router />
      </MantineProvider>
    </>
  );
};
