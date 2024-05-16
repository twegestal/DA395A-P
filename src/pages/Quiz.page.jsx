import { useEffect, useState } from 'react';
import { Button, Paper, Stack, Text, Title } from '@mantine/core';
import { Fireworks } from '@fireworks-js/react';
import { SingleChoiceQuestion } from '../components/quiz/SingleChoiceQuestion';
import { FreeTextQuestion } from '../components/quiz/FreeTextQuestion';
import { Result } from '../components/quiz/Result';
import { useNavigate, useParams } from 'react-router-dom';
import { fireworksOptions } from '../utils/constants';
import { quizRepository } from '../repository/QuizRepository';

export const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [evaluantionResult, setEvaluationResult] = useState();
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [quiz, setQuiz] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!quiz) {
      fetchQuizData();
    }
  }, [quiz]);

  const fetchQuizData = () => {
    const quizResponse = quizRepository.getQuiz(id);
    if (quizResponse) {
      setAnswers(Array(quizResponse.questions.length).fill(''));
      setQuiz(quizResponse);
    } else {
      //TODO NGT GICK FEL
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
    quizRepository.setQuizResult(quiz.id, score === 5);
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
          <Title>{quiz.title}</Title>
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
          options={fireworksOptions}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      )}
    </>
  );
};
