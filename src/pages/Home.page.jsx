import { CreateQuiz } from '../components/CreateQuiz';
import { Text, Stack, LoadingOverlay, Title } from '@mantine/core';
import { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { useEffect } from 'react';
import { Quiz } from '../components/quiz/Quiz';

export const HomePage = () => {
  const { generateQuiz, quizResponse } = useQuiz();
  const [visible, setVisible] = useState(false);

  const fetchQuiz = ({ difficulty, language }) => {
    setVisible(true);
    generateQuiz(language, difficulty);
  };

  useEffect(() => {
    if (quizResponse) {
      setVisible(false);
    }
  }, [quizResponse]);

  return (
    <>
      <LoadingOverlay visible={visible} />

      {quizResponse ? (
        <>
          <Quiz
            description={quizResponse.description}
            difficulty={quizResponse.difficulty}
            questions={quizResponse.questions}
          />
        </>
      ) : (
        <Stack align='center' justify='center'>
          <Title order={1}>Welcome to the Polygot Lingo Venture</Title>
          <Text>
            You can browse between different quizzes in the menu or create a new quiz below.
          </Text>
          <CreateQuiz fetchQuiz={fetchQuiz} />
        </Stack>
      )}
    </>
  );
};
