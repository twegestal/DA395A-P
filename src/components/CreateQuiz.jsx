import { TextInput, Button, Group, Paper, Radio, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

export const CreateQuiz = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      language: '',
      difficulty: 'beginner',
    },

    validate: {
      language: (value) => (/^\S+$/.test(value) ? null : 'Invalid input'),
      difficulty: (value) => (value ? null : 'Must choose one option'),
    },
  });

  return (
    <Paper shadow='sm' radius='md' withBorder p='xl'>
      <Text size='xl' mb='md'>
        Create a new language quiz
      </Text>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label='Language'
          placeholder='Swenglish'
          mb='md'
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
            <Radio value={'proelite'} label='Proelite' />
          </Group>
        </Radio.Group>
        <Group justify='center' mt='md'>
          <Button fullWidth type='submit'>
            Create
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
