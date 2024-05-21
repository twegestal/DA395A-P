import React from 'react';
import { Stack, Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CorrectAnswer } from './CorrectAnswer';
import { IncorrectAnswer } from './IncorrectAnswer';
import '../styles.css';

export const Result = ({ opened, result: { results, score }, onClose }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      padding={20}
      title={`You got ${score} out of ${results.length} points`}
      className={'modal'}
      fullScreen={isMobile}
    >
      <Stack>
        {results.map((answer, index) => (
          <React.Fragment key={index}>
            {answer.isCorrect ? (
              <CorrectAnswer answer={answer} />
            ) : (
              <IncorrectAnswer answer={answer} />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Modal>
  );
};
