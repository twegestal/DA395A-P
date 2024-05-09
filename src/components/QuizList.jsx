import { Accordion, Divider, Title } from '@mantine/core';
import { QuizListItem } from './QuizListItem';
import React from 'react';

const quizzes = [
  {
    id: '1',
    title: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    difficulty: 'advanced',
    language: 'Spanish',
    isFinished: false,
  },

  {
    id: '2',
    title: 'Carol Miller',
    description: 'One of the richest people on Earth',
    difficulty: 'intermediate',
    language: 'Spanish',
    isFinished: true,
  },

  {
    id: '3',
    title: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    difficulty: 'beginner',
    language: 'Langom',
    isFinished: null,
  },
];

export const QuizList = () => {
  const groupedByLanguage = quizzes.reduce((acc, quiz) => {
    const language = quiz.language;
    if (!acc[language]) {
      acc[language] = [];
    }
    acc[language].push(quiz);
    return acc;
  }, {});
  // const items = quizzes.map((item) => <QuizListItem key={item.id} item={item} />);

  return (
    <Accordion
      variant='contained'
      styles={{
        chevron: {
          display: 'none', // This hides the chevron
        },
      }}
    >
      {Object.entries(groupedByLanguage).map(([language, items]) => (
        <React.Fragment key={language}>
          <Divider
            size='lg'
            mt='lg'
            mb='md'
            label={<Title order={4}>{language}</Title>}
            labelPosition='left'
          />

          {items.map((item) => (
            <QuizListItem key={item.id} item={item} failColor='red' successColor='green' />
          ))}
        </React.Fragment>
      ))}
    </Accordion>
  );
};
