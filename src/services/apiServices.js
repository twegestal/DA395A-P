import ky from 'ky';
import { v4 as uuidv4 } from 'uuid';
const url = 'https://api.openai.com/v1/chat/completions';
import { quizRepository } from '../repository/QuizRepository';
import { capitalizeFirstLetter } from '../utils/utils';

export const generateQuiz = async (language, difficulty) => {
  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `I want you to create a vocabulary quiz that tests the user on the language ${language}. The questions should be phrased in English. The title should be phrased in an engaging manner, inspiring the user to learn. The questions should range from serious to absurd. There should be at least five questions. The questions should be either single choice or free text. The difficulty of the quiz should be on a ${difficulty} level. Please provide a description of the quiz. Please answer only with a JSON object using the following schema:{\"title\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"difficulty\":{\"type\":\"string\",\"enum\":[\"beginner\",\"intermediate\",\"advanced\"]},\"language\":{\"type\":\"string\"},\"questions\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"correct_answer\":{\"type\":\"string\"},\"options\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"minItems\":1},\"question\":{\"type\":\"string\"},\"type\":{\"type\":\"string\",\"enum\":[\"single_choice\",\"free_text\"]}},\"required\":[\"correct_answer\",\"question\",\"type\"],\"additionalProperties\":false}}},\"required\":[\"title\",\"description\",\"difficulty\",\"language\",\"questions\"],\"additionalProperties\":false}`,
      },
    ],
  };
  try {
    const response = await ky
      .post(url, {
        json: payload,
        headers: { Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}` },
      })
      .json();

    if (!response) {
      throw new Error();
    }

    return storeQuiz(response);
  } catch (error) {
    console.error('Error generating quiz: ', error);
  }
};

const storeQuiz = (response) => {
  const quizContent = JSON.parse(response.choices[0].message.content);
  const quiz = {
    ...quizContent,
    language: capitalizeFirstLetter(quizContent.language),
    id: uuidv4(),
  };
  quizRepository.setQuiz(quiz);
  return quiz.id;
};
