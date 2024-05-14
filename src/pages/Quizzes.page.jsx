import { Title } from '@mantine/core';
import { QuizList } from '../components/QuizList';
import { useNavigate } from 'react-router-dom';
export const QuizzesPage = () => {
  const navigate = useNavigate();

  const redirectToQuiz = (id) => {
    navigate(`/quiz/${id}`)
  }
  return (
    <>
      <Title>Here are some quizzes:</Title>
      <QuizList redirectToQuiz={redirectToQuiz} />
    </>
  );
};
