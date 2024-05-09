import { CreateQuiz } from '../components/CreateQuiz';
import { Text, Stack, LoadingOverlay, Title } from '@mantine/core';
import { useState } from 'react';
export const HomePage = () => {
  const [visible, setVisible] = useState(false);
  const fetchQuiz = (values) => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
    console.log(values);

    //Route to /quiz
  };
  return (
    <>
      <LoadingOverlay visible={visible} />
      <Stack align='center' justify='center'>
        <Title order={1}>Welcome to the Polygot Lingo Venture</Title>
        <Text>
          You can browse between different quizzes in the menu or create a new quiz below.
        </Text>
        <CreateQuiz fetchQuiz={fetchQuiz} />
      </Stack>
    </>
  );
};
