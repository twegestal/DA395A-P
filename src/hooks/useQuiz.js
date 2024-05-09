import { useState } from 'react';
import { openAICall } from '../services/apiServices';
import { testObject } from '../test';

export const useQuiz = () => {
  const [quizResponse, setQuizResponse] = useState();

  const generateQuiz = async (language, difficulty) => {
    //const response = await openAICall(language, difficulty);
    setQuizResponse(() => {
      //return JSON.parse(response.choices[0].message.content);
      return testObject;
    });
  };

  return { generateQuiz, quizResponse };
};
