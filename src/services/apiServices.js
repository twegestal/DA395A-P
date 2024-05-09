import ky from 'ky';
const url = 'https://api.openai.com/v1/chat/completions';

export const openAICall = async (language, difficulty) => {
  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `I want you to create a vocabulary quiz on the language ${language}. There should be five questions. The questions should be either single choice or free text. The difficulty of the quiz should be on a ${difficulty} level. Please provide a description of the quiz. Please answer only with a JSON object using the following schema:{\"type\":\"object\",\"properties\":{\"questions\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"question\":{\"type\":\"string\"},\"type\":{\"type\":\"string\",\"enum\":[\"single_choice\",\"free_text\"]},\"options\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}},\"correct_answer\":{\"type\":\"string\"}},\"required\":[\"question\",\"type\",\"correct_answer\"],\"additionalProperties\":false}},\"description\":{\"type\":\"string\"},\"difficulty\":{\"type\":\"string\",\"enum\":[\"beginner\",\"intermediate\",\"advanced\"]},\"required\":[\"questions\",\"description\",\"difficulty\"],\"additionalProperties\":false}`,
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

    return response;
  } catch (error) {
    console.error('Error generating quiz: ', error);
    //TODO: retry...
  }
};
