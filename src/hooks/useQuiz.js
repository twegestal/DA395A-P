import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateQuiz } from '../services/apiServices';
import { testObject } from '../test';

export const useQuiz = () => {
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    if (!quizzes) {
      
    }
  });

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

  const fetchQuiz = (id) => quizzes.forEach((quiz) => quiz.id === id);

  return { generateQuiz, quizzes };
};
