import { Button, Text, Box, Image, Group, Flex, Tooltip } from '@mantine/core';
import { IconX, IconCheck, IconMinus } from '@tabler/icons-react';
import { failColor, successColor } from '../../utils/constants';
import '../styles.css';
import beginnerLogo from '../../assets/beginner.svg';
import intermediateLogo from '../../assets/intermediate.svg';
import advancedLogo from '../../assets/advanced.svg';
import { capitalizeFirstLetter } from '../../utils/utils';

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
          <Text>{item.title}</Text>
          <Flex>
            <Text size='sm' c='dimmed' fw={400} mr={5}>
              Difficulty:
            </Text>
            <Group>
              <Tooltip label={capitalizeFirstLetter(item.difficulty)}>
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
              </Tooltip>
            </Group>
          </Flex>
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
