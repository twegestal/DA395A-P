import { useEffect, useState } from 'react';
import { Button, Paper, Stack, Text, Title } from '@mantine/core';
import { Fireworks } from '@fireworks-js/react';
import { SingleChoiceQuestion } from '../components/quiz/SingleChoiceQuestion';
import { FreeTextQuestion } from '../components/quiz/FreeTextQuestion';
import { Result } from '../components/quiz/Result';
import { useNavigate } from 'react-router-dom';

export const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [evaluantionResult, setEvaluationResult] = useState();
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [quiz, setQuiz] = useState();
  const navigate = useNavigate();

  //TODO move this to constants
  const options = {
    speed: 3,
    density: 5,
    colors: ['#cc3333', '#4CAF50', '#81C784'],
    zIndex: 100,
    boundary: { x1: 0, y1: 0, x2: window.innerWidth, y2: window.innerHeight },
  };

  useEffect(() => {
    if (!quiz) {
      fetchQuizData();
    }
  }, [quiz]);

  const fetchQuizData = () => {
    const quizId = localStorage.getItem('quizId');
    if (!quizId) {
      console.error('No quiz ID found in localStorage.');
      return;
    }

    const quizString = localStorage.getItem(quizId);
    localStorage.removeItem('quizId');
    if (!quizString) {
      console.error('No quiz data found for ID:', quizId);
      return;
    }

    try {
      const quizData = JSON.parse(quizString);
      setQuiz(quizData);
      setAnswers(Array(quizData.questions.length).fill(''));
    } catch (e) {
      console.error('Failed to parse quiz data:', e);
    }
  };

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quiz.questions.length) {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const submitAnswers = () => {
    const results = evaluateAnswers();
    const score = results.reduce((acc, curr) => acc + (curr.isCorrect ? 1 : 0), 0);
    const quizResult = {
      results: results,
      score: score,
    };
    setEvaluationResult(quizResult);
    setIsResultOpen(true);
  };

  const evaluateAnswers = () => {
    return quiz.questions.map((question, index) => {
      const userAnswer = answers[index].toLowerCase();
      const correctAnswer = question.correct_answer.toLowerCase();
      const isCorrect = userAnswer === correctAnswer;

      return {
        question: question.question,
        userAnswer,
        correctAnswer,
        isCorrect,
      };
    });
  };

  const closeResults = () => {
    setIsResultOpen(false);
    navigate('/');
  };

  const renderQuestion = (question) => {
    return question.type === 'single_choice' ? (
      <SingleChoiceQuestion
        questionIndex={currentQuestionIndex}
        question={question}
        value={answers[currentQuestionIndex]}
        handleAnswerChange={handleAnswerChange}
      />
    ) : (
      <FreeTextQuestion
        questionIndex={currentQuestionIndex}
        question={question}
        value={answers[currentQuestionIndex]}
        handleAnswerChange={handleAnswerChange}
      />
    );
  };

  return (
    <>
      {quiz && (
        <Stack>
          <Title>QUIZ</Title>
          <Text size='lg'>{quiz.description}</Text>
          <Paper shadow='sm' radius='md' withBorder p='xl'>
            <Stack>
              {renderQuestion(quiz.questions[currentQuestionIndex])}
              <Button
                onClick={
                  currentQuestionIndex === quiz.questions.length - 1 ? submitAnswers : nextQuestion
                }
              >
                {currentQuestionIndex === quiz.questions.length - 1
                  ? 'Submit answers'
                  : 'Next question'}
              </Button>
            </Stack>
          </Paper>
        </Stack>
      )}
      {evaluantionResult && (
        <Result opened={isResultOpen} result={evaluantionResult} onClose={closeResults} />
      )}
      {isResultOpen && (
        <Fireworks
          options={options}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      )}
    </>
  );
};
