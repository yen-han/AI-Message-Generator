const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

export function generateAI(text) {
  return openai.createCompletion({
    model: "text-davinci-002",
    prompt: text,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
}
