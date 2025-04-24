// import { sendToGemini } from '@/app/api/chat/route';
// import { general_prompt } from './promt-choice';

// export const useGeminiChat = (mentorText: string) => {
//   const sendMessage = async (input: string): Promise<string> => {
//     const combined = `
// ${general_prompt}

// --- 

// 📦 Dữ liệu về các gói dịch vụ SEM Scholars:
// ${mentorText}

// ---

// 🧑‍💻 Lưu ý đầu ra:
// - Mặc định trả lời bằng tiếng Anh
// - Nếu người dùng sử dụng tiếng Việt, trả lời bằng tiếng Việt. KHÔNG cần giải thích việc phát hiện ngôn ngữ
// - Giọng điệu thân thiện, hỗ trợ, chuyên nghiệp — như một cố vấn thực thụ

// ---

// 🚫 RẤT QUAN TRỌNG — QUY TẮC ĐỊNH DẠNG:
// - ❌ KHÔNG sử dụng markdown
// - ❌ KHÔNG sử dụng *, **, hoặc \`backticks\` hoặc bất kỳ ký tự nào để làm nổi bật văn bản.
// - ❌ KHÔNG sử dụng code block hoặc highlight cú pháp
// - ✅ CHỈ sử dụng văn bản thuần túy, trình bày như một đoạn văn bình thường

// ---

// 🗨️ Câu hỏi của người dùng:
// "${input}"

// 📝 Trả lời:
// `;

//     return await sendToGemini(combined);
//   };

//   return {
//     sendMessage,
//   };
// };
