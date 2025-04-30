import { useRef } from "react";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { CohereEmbeddings } from "@langchain/cohere";
import { Document } from "langchain/document";
import { sendToGemini } from "@/app/api/chat/route";
import { general_prompt } from "@/hooks/promt-choice";

export const useRAG = () => {
  const vectorStoreRef = useRef<MemoryVectorStore | null>(null);

  const initializeStore = async () => {
    if (vectorStoreRef.current) return; 

    try {
      const res = await fetch("/text_files/service_infor.txt");
      const text = await res.text();

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
        separators: ["\n\n", "Tên gói mentor", "."],
      });

      const docs = await splitter.createDocuments([text]);

      const embeddings = new CohereEmbeddings({
        apiKey: process.env.NEXT_PUBLIC_COHERE_API_KEY!,
        model: "embed-multilingual-v3.0"
      });

      const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
      vectorStoreRef.current = store;
    } catch (err) {
    }
  };

  const askWithRAG = async (question: string): Promise<string> => {
    const store = vectorStoreRef.current;
    if (!store) return "❌ Error: Knowledge base not loaded. Please try again later.";

    const results = await store.similaritySearch(question, 8);
    const context = results.map((doc: Document) => doc.pageContent).join("\n\n");

    const finalPrompt = `
${general_prompt}

---

📦 Dữ liệu về các gói dịch vụ SEM Scholars:
${context}

---

🧑‍💻 Lưu ý đầu ra:
- Mặc định trả lời bằng tiếng Anh
- Nếu người dùng sử dụng tiếng Việt, trả lời bằng tiếng Việt. KHÔNG cần giải thích việc phát hiện ngôn ngữ
- Giọng điệu thân thiện, hỗ trợ, chuyên nghiệp — như một cố vấn thực thụ
- Chỉ sử dụng thông tin bên trên để trả lời. Không tự suy diễn. Nếu người dùng hỏi về các dịch vụ, phải liệt kê **tên gói mentor**, **đối tượng phù hợp**, và **nội dung chi tiết** nếu có.
- Nếu có nhiều gói, hãy trình bày rõ ràng, dễ đọc, có thể chia theo bullet hoặc đoạn riêng biệt.
- Hãy **thêm icon emoji phù hợp** ở đầu các mục quan trọng.

---

🚫 RẤT QUAN TRỌNG — QUY TẮC ĐỊNH DẠNG:
- ❌ KHÔNG sử dụng markdown
- ❌ KHÔNG sử dụng *, **, hoặc \`backticks\` hoặc bất kỳ ký tự nào để làm nổi bật văn bản.
- ❌ KHÔNG sử dụng code block hoặc highlight cú pháp
- ✅ CHỈ sử dụng văn bản thuần túy, trình bày như một đoạn văn bình thường

---

🗨️ Câu hỏi của người dùng:
"${question}"

📜 Trả lời:
`;
    // console.log("📦 Retrieved context for Gemini:\n", context);
    return await sendToGemini(finalPrompt);
  };

  return {
    initializeStore,
    askWithRAG,
  };
};
