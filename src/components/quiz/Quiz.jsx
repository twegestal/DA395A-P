import { useState } from 'react';
import { Button, Paper, Stack, Text, Title } from '@mantine/core';
import { SingeChoiceQuestion } from './SingleChoiceQuestion';
import { FreeTextQuestion } from './FreeTextQuestion';

export const Quiz = ({ description, difficulty, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

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
    console.log(results);
    console.log(score);
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
  );
};
