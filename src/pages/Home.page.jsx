import { CreateQuiz } from '../components/CreateQuiz';
import { Text, Stack, LoadingOverlay, Title } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuiz } from '../services/apiServices';

export const HomePage = () => {
  //const { generateQuiz } = useQuiz();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const fetchQuiz = async ({ difficulty, language }) => {
    setVisible(true);
    const quizId = await generateQuiz(language, difficulty);
    if (quizId) {
      setVisible(false);
      navigate(`/quiz/${quizId}`);
    }
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
