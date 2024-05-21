
import { Button, Text, Box, Image, Group, Flex } from '@mantine/core';
import { IconX, IconCheck, IconMinus } from '@tabler/icons-react';
import { failColor, successColor } from '../../utils/constants';
import '../styles.css';
import beginnerLogo from '../../assets/beginner.svg';
import intermediateLogo from '../../assets/intermediate.svg';
import advancedLogo from '../../assets/advanced.svg';

export const QuizListItem = ({ item, redirectToQuiz, status }) => {
  return (
    <Box className='quiz-list-item' value={item.id} key={item.title}>
      <Flex>
        <Box mr={10}>
          {status === 'success' ? (
            <IconCheck size={30} color={successColor} />
          ) : status === 'fail' ? (
            <IconX size={30} color={failColor} />
          ) : (
            <IconMinus size={30} color='gray' />
          )}
        </Box>
        <Box>
          <Group>
            <Text>{item.title}</Text>
            <Image
              src={
                item.difficulty === 'beginner'
                  ? beginnerLogo
                  : item.difficulty === 'intermediate'
                    ? intermediateLogo
                    : advancedLogo
              }
              w={60}
            />
          </Group>
          <Text size='sm' c='dimmed' fw={400}>
            {item.description}
          </Text>
        </Box>
      </Flex>
      <Box mr={6} ml={6}>
        <Button variant='outline' onClick={() => redirectToQuiz(item.id)}>
          {status === 'neutral' ? 'Start' : 'Try again'}
        </Button>
      </Box>
    </Box>
  );
};
