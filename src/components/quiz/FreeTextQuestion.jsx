import { Stack, Text, Input } from '@mantine/core';

export const FreeTextQuestion = ({ questionIndex, question, value, handleAnswerChange }) => {
  return (
    <Stack key={questionIndex}>
      <Text fw={700}>{question.question}</Text>
      <Input
        placeholder='Answer...'
        value={value}
        onChange={(e) => handleAnswerChange(e.target.value)}
      />
    </Stack>
  );
};
