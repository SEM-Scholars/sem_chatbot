import { sendToGemini } from '@/app/api/chat/route'; // adjust path as needed
import { general_promt } from './promt-choice';

export const useGeminiChat = (mentorText: String) => {

  const sendMessage = async (input: string): Promise<string> => {
    const combined = `${input} \n\n ${general_promt}\n\n${mentorText}`
    return await sendToGemini(combined)
  }

  return {
    sendMessage,
  }
}