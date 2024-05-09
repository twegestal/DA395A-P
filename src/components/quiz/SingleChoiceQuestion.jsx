import { Stack, Text, Radio } from '@mantine/core';

export const SingeChoiceQuestion = ({ questionIndex, question, value, handleAnswerChange }) => {
  return (
    <Stack key={questionIndex}>
      <Text fw={700}>{question.question}</Text>
      <Radio.Group value={value} onChange={(value) => handleAnswerChange(value)}>
        <Stack>
          {question.options.map((option, optionIndex) => (
            <Radio key={optionIndex} value={option} label={option} />
          ))}
        </Stack>
      </Radio.Group>
    </Stack>
  );
};
