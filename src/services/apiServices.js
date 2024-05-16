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
        content: `I want you to create a vocabulary quiz on the language ${language}. There should be five questions. The questions should be either single choice or free text. The difficulty of the quiz should be on a ${difficulty} level. Please provide a description of the quiz. Please answer only with a JSON object using the following schema:{\"title\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"difficulty\":{\"type\":\"string\",\"enum\":[\"beginner\",\"intermediate\",\"advanced\"]},\"language\":{\"type\":\"string\"},\"questions\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"correct_answer\":{\"type\":\"string\"},\"options\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"minItems\":1},\"question\":{\"type\":\"string\"},\"type\":{\"type\":\"string\",\"enum\":[\"single_choice\",\"free_text\"]}},\"required\":[\"correct_answer\",\"question\",\"type\"],\"additionalProperties\":false}}},\"required\":[\"title\",\"description\",\"difficulty\",\"language\",\"questions\"],\"additionalProperties\":false}`,
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
    //TODO: retry...
  }
};

const storeQuiz = (response) => {
  const quiz = JSON.parse(response.choices[0].message.content);
  quiz.language = capitalizeFirstLetter(quiz.language);
  const uuid = uuidv4();
  quiz.id = uuid;
  quizRepository.setQuiz(quiz);
  return quiz.id;
};
