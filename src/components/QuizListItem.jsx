/* eslint-disable react/prop-types */
import { Group, Button, Text, Accordion, Center, Box } from '@mantine/core';
import { IconX, IconCheck, IconMinus } from '@tabler/icons-react';
import { failColor, successColor } from '../utils/constants';

export const QuizListItem = ({ item, redirectToQuiz }) => {
  return (
    <Accordion.Item value={item.id} key={item.title}>
      <Center>
        <Accordion.Control
          icon={
            !item.isFinished ? (
              <IconMinus size={30} color='gray' />
            ) : !item.isFinished ? (
              <IconX size={30} color={failColor} />
            ) : (
              <IconCheck size={30} color={successColor} />
            )
          }
        >
          <Group wrap='nowrap'>
            <Box>
              <Text>{item.title}</Text>
              <Text size='sm' c='dimmed' fw={400}>
                {item.description}
              </Text>
            </Box>
          </Group>
        </Accordion.Control>
        <Box>
          <Button variant='outline' mr='md' onClick={() => redirectToQuiz(item.id)}>
            Start
          </Button>
        </Box>
      </Center>
    </Accordion.Item>
  );
};
