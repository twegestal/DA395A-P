import { Modal, Text } from '@mantine/core';

export const Result = ({ opened, score, closeResultModal }) => {
  return (
    <Modal opened={opened} onClose={closeResultModal} title='Quiz Results'>
      <Text>
        Your score is {score} out of {score.length}
      </Text>
    </Modal>
  );
};
