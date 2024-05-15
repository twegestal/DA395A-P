/* eslint-disable react/prop-types */
import { List, Divider, Title } from '@mantine/core';
import { QuizListItem } from './QuizListItem';
import React, { useEffect, useState } from 'react';
import { quizRepository } from '../../repository/QuizRepository';

export const QuizList = ({ redirectToQuiz }) => {
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    if (!quizzes) {
      const fetchedQuizzes = quizRepository.getAllQuizzes();
      fetchedQuizzes.sort((a, b) => a.language.localeCompare(b.language));
      setQuizzes(fetchedQuizzes);
    }
  }, [quizzes]);

  const groupByLanguage = (quizzes) => {
    return quizzes.reduce((groups, quiz) => {
      (groups[quiz.language] = groups[quiz.language] || []).push(quiz);
      return groups;
    }, {});
  };

  return (
    <>
      {quizzes && (
        <List>
          {Object.entries(groupByLanguage(quizzes)).map(([language, quizzesInLanguage]) => (
            <React.Fragment key={language}>
              <Divider
                size='lg'
                mt='lg'
                mb='md'
                label={<Title order={4}>{language}</Title>}
                labelPosition='left'
              />

              {quizzesInLanguage.map((quiz) => (
                <QuizListItem
                  key={quiz.id}
                  item={quiz}
                  redirectToQuiz={redirectToQuiz}
                  status={'fail'}
                />
              ))}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};
