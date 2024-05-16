import { List, Divider, Title } from '@mantine/core';
import { QuizListItem } from './QuizListItem';
import React, { useEffect, useState } from 'react';
import { quizRepository } from '../../repository/QuizRepository';

export const QuizList = ({ redirectToQuiz }) => {
  const [quizzes, setQuizzes] = useState();
  const [results, setResults] = useState();

  useEffect(() => {
    if (!quizzes) {
      const fetchedQuizzes = quizRepository.getAllQuizzes();
      fetchedQuizzes.sort((a, b) => a.language.localeCompare(b.language));
      setQuizzes(fetchedQuizzes);

      setResults(quizRepository.getQuizResults());
    }
  }, [quizzes, results]);

  const groupByLanguage = (quizzes) => {
    return quizzes.reduce((groups, quiz) => {
      (groups[quiz.language] = groups[quiz.language] || []).push(quiz);
      return groups;
    }, {});
  };

  const getStatus = (id) => {
    return results[id] !== undefined ? (results[id] ? 'success' : 'fail') : 'neutral';
  };

  return (
    <>
      {quizzes && results && (
        <List>
          {Object.entries(groupByLanguage(quizzes)).map(([language, quizzesInLanguage]) => (
            <React.Fragment key={language}>
              <Divider
                size='lg'
                mt='lg'
                mb='md'
                label={<Title order={4}>{language}</Title>}
                labelPosition='left'
                maw={800}
              />

              {quizzesInLanguage.map((quiz) => (
                <QuizListItem
                  key={quiz.id}
                  item={quiz}
                  redirectToQuiz={redirectToQuiz}
                  status={getStatus(quiz.id)}
                />
              ))}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};
