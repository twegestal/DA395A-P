import { Title, Text } from '@mantine/core';
import { PieChart } from '@mantine/charts';
import { quizRepository } from '../repository/QuizRepository';
import { failColor, successColor } from '../utils/constants';

export const StatsPage = () => {
  const totAmt = quizRepository.getTotalAmountOfQuizzes();
  const results = quizRepository.getQuizResults();
  const amtDone = Object.values(results).filter((value) => value === true).length;
  const amtTried = Object.keys(results).length;

  const data1 = [
    { name: 'Done', value: amtDone, color: successColor },
    { name: 'Total', value: totAmt - amtDone, color: 'gray.6' },
  ];
  const data2 = [
    { name: 'Done', value: amtDone, color: successColor },
    { name: 'Total', value: amtTried - amtDone, color: failColor },
  ];
  return (
    <>
      <Title order={1}>Statistics</Title>
      <Text>
        You&apos;ve successfully completed {((amtDone / totAmt) * 100).toFixed(0)}% of the total
        amount of quizzes.
      </Text>

      <PieChart
        withLabelsLine
        labelsPosition='outside'
        labelsType='value'
        withLabels
        data={data1}
      />
      {amtTried > 0 && (
        <>
          <Text>
            You&apos;ve successfully completed {((amtDone / amtTried) * 100).toFixed(0)}% of the
            quizzes you&apos;ve tried.
          </Text>
          <PieChart
            withLabelsLine
            labelsPosition='outside'
            labelsType='value'
            withLabels
            data={data2}
          />
        </>
      )}
    </>
  );
};
