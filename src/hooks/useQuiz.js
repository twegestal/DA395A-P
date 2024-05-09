import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { openAICall } from '../services/apiServices';
import { testObject } from '../test';

export const useQuiz = () => {
  const [quizResponse, setQuizResponse] = useState();

  const generateQuiz = async (language, difficulty) => {
    // const response = await openAICall(language, difficulty);
    // setQuizResponse(() => {
    //   return JSON.parse(response.choices[0].message.content);
    // });
    const uuid = uuidv4();
    localStorage.setItem('quizId', uuid);
    localStorage.setItem(uuid, JSON.stringify(testObject));

    return true;
  };

  return { generateQuiz, quizResponse };
};
