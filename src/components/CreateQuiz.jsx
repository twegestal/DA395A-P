/* eslint-disable react/prop-types */
import { TextInput, Button, Group, Paper, Radio, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSquarePlus } from '@tabler/icons-react';

export const CreateQuiz = ({ fetchQuiz }) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      language: '',
      difficulty: 'beginner',
    },

    validate: {
      language: (value) =>
        /^.{2,30}$/.test(value) ? null : 'Input needs to be between 2 and 30 characters',
      difficulty: (value) => (value ? null : 'Must choose one option'),
    },
  });

  return (
    <Paper shadow='sm' radius='md' withBorder p='xl'>
      <Text size='xl' mb='md'>
        Create a new language quiz.
      </Text>
      <form onSubmit={form.onSubmit((values) => fetchQuiz(values))}>
        <TextInput
          withAsterisk
          label='Language'
          placeholder='Swenglish'
          mb='md'
          autoComplete='off'
          key={form.key('language')}
          {...form.getInputProps('language')}
        />

        <Radio.Group
          name='difficulty'
          label='Difficulty level'
          withAsterisk
          {...form.getInputProps('difficulty')}
        >
          <Group>
            <Radio value={'beginner'} label='Beginner' />
            <Radio value={'intermediate'} label='Intermediate' />
            <Radio value={'advanced'} label='ProElite' />
          </Group>
        </Radio.Group>
        <Group justify='center' mt='md'>
          <Button fullWidth type='submit' rightSection={<IconSquarePlus />}>
            Create
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
