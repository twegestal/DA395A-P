import { useState } from 'react';
import { Button, Paper, Stack, Text, Title } from '@mantine/core';
import { SingeChoiceQuestion } from './SingleChoiceQuestion';
import { FreeTextQuestion } from './FreeTextQuestion';
import { Fireworks } from '@fireworks-js/react';
import { Result } from './Result';

export const Quiz = ({ description, difficulty, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [evaluantionResult, setEvaluationResult] = useState();
  const [isResultOpen, setIsResultOpen] = useState(false);
  //TODO move this to constants
  const options = {
    speed: 3,
    density: 5,
    colors: ['#cc3333', '#4CAF50', '#81C784'],
    zIndex: 100,
    boundary: { x1: 0, y1: 0, x2: window.innerWidth, y2: window.innerHeight },
  };

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
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
    return questions.map((question, index) => {
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
  };

  const renderQuestion = (question) => {
    return question.type === 'single_choice' ? (
      <SingeChoiceQuestion
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
      <Stack>
        <Title>QUIZ</Title>
        <Text size='lg'>{description}</Text>
        <Paper shadow='sm' radius='md' withBorder p='xl'>
          <Stack>
            {renderQuestion(questions[currentQuestionIndex])}
            <Button
              onClick={currentQuestionIndex === questions.length - 1 ? submitAnswers : nextQuestion}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Submit answers' : 'Next question'}
            </Button>
          </Stack>
        </Paper>
      </Stack>
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
