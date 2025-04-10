import { sendToGemini } from '@/app/api/chat/route'; // adjust path as needed

export const useGeminiChat = () => {
  const sendMessage = async (input: string): Promise<string> => {
    return await sendToGemini(input);
  };

  return {
    sendMessage,
  };
};