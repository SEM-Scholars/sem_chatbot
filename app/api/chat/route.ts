import axios from 'axios'

const GEMINI_API_KEY = 'AIzaSyBwhid-sXnHbpoDjZxYEuE0RZrPo6nGR00'; // Replace this with your actual Gemini API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const sendToGemini = async (userInput: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: userInput }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response from Gemini.';
    return reply;

  } catch (error: any) {
    console.error('Gemini API error:', error.message);
    return 'Error fetching response from Gemini.';
  }
};

