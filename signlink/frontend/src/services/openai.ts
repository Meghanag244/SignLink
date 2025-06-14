import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const enhanceText = async (text: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that enhances sign language text to make it more natural and clear. Keep the meaning the same but make it more fluent.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0].message.content || text;
  } catch (error) {
    console.error('Error enhancing text:', error);
    return text;
  }
};

export const getSuggestions = async (text: string): Promise<string[]> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that suggests natural follow-up phrases based on the given text. Provide 3 suggestions that would be relevant in a conversation.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const suggestions = response.choices[0].message.content?.split('\n') || [];
    return suggestions.filter(Boolean).map((s: string) => s.replace(/^\d+\.\s*/, ''));
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return [];
  }
};

export const convertToSignLanguage = async (text: string): Promise<string[]> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that converts text into sign language instructions. Break down the text into individual signs and provide clear instructions for each sign.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const instructions = response.choices[0].message.content?.split('\n') || [];
    return instructions.filter(Boolean);
  } catch (error) {
    console.error('Error converting to sign language:', error);
    return [];
  }
}; 