import { CreateQuiz } from '../components/CreateQuiz';
import { Text, Stack, LoadingOverlay, Title } from '@mantine/core';
import { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { generateQuiz } = useQuiz();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const fetchQuiz = ({ difficulty, language }) => {
    setVisible(true);
    const response = generateQuiz(language, difficulty);
    if (response) {
      setVisible(false);
      navigate('/quiz');
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
