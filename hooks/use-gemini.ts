import { sendToGemini } from '@/app/api/chat/route'; // adjust path as needed
import { general_promt } from './promt-choice';

export const useGeminiChat = (mentorText: String) => {

  const sendMessage = async (input: string): Promise<string> => {
    const combined = `
      This is the requirement for you as a bilingual chatbot: ${general_promt} \n\n 
      Information about SEM Scholars: ${mentorText} \n\n
      Output: only text, no markdown, no star highlight, no syntax highlight. You should answer in both english and vietnamese \n\n
      Here is the user's question: ${input} \n\n 
      Your answer:
      `; 
    return await sendToGemini(combined)
  }

  return {
    sendMessage,
  }
}