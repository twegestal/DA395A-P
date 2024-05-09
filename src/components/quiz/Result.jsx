import { Modal, Text } from '@mantine/core';

export const Result = ({ opened, result, onClose }) => {
  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
      }}
      title='Result'
    >
      <Text>
        You got {result.score} of {result.results.length}!
      </Text>
    </Modal>
  );
};
