import { CreateQuiz } from '../components/CreateQuiz';
import { Text, Stack } from '@mantine/core';
export const HomePage = () => {
  return (
    <>
      <Stack align='center' justify='center'>
        <Text size='xl'>Welcome to the Polygot Lingo Venture</Text>
        <CreateQuiz />
      </Stack>
    </>
  );
};
