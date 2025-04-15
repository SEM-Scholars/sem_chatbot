import { sendToGemini } from '@/app/api/chat/route'; // adjust path as needed
import { general_promt } from './promt-choice';

export const useGeminiChat = (mentorText: String) => {

  const sendMessage = async (input: string): Promise<string> => {
    const combined = `
      Here is the user's question: ${input} \n\n 
      This is the requirement for you as a bilingual chatbot: ${general_promt} \n\n 
      Information about SEM Scholars: ${mentorText}
      Output: only text, no markdown, no star highlight, no syntax highlight. You should answer in both english and vietnamese`; 
      const system_instruction = " "
    return await sendToGemini(combined, system_instruction)
  }

  return {
    sendMessage,
  }
}