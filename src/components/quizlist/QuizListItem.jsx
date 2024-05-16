/* eslint-disable react/prop-types */
import { Button, Text, Box, Group } from '@mantine/core';
import { IconX, IconCheck, IconMinus } from '@tabler/icons-react';
import { failColor, successColor } from '../../utils/constants';
import '../styles.css';

export const QuizListItem = ({ item, redirectToQuiz, status }) => {
  return (
    <Box className='quiz-list-item' value={item.id} key={item.title}>
      <Group>
        {status === 'success' ? (
          <IconCheck size={30} color={successColor} />
        ) : status === 'fail' ? (
          <IconX size={30} color={failColor} />
        ) : (
          <IconMinus size={30} color='gray' />
        )}
        <Box>
          <Text>{item.title}</Text>
          <Text size='sm' c='dimmed' fw={400}>
            {item.description}
          </Text>
        </Box>
      </Group>
      <Box mr={6}>
        <Button variant='outline' onClick={() => redirectToQuiz(item.id)}>
          {status === 'neutral' ? 'Start' : 'Try again'}
        </Button>
      </Box>
    </Box>
  );
};
