import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export type ChatMode = "normal" | "research" | "shopping" | "study" | "creative";

const MODE_INSTRUCTIONS: Record<ChatMode, string> = {
    normal: "You are a helpful, friendly, and intelligent personal assistant. You answer questions clearly and concisely. If asked to generate a chart, return a JSON object wrapped in ```json code block with 'chartType' ('pie' or 'bar') and 'data' (array of objects with 'name', 'value', and optional 'color').",
    research: "You are a deep research assistant. Provide detailed, well-cited answers. Always search for the latest information. If asked for a chart, return JSON as described.",
    shopping: "You are a personal shopping assistant. Help the user find products, compare prices, and make recommendations.",
    study: "You are a tutor. Explain concepts simply, provide examples, and help the user learn. Do not just give answers, help them understand.",
    creative: "You are a creative assistant. Help with brainstorming, writing, and generating ideas. If asked for images, describe them in detail for an image generator.",
};

export async function sendMessageToGemini(
    message: string,
    history: { role: "user" | "model"; parts: string }[],
    mode: ChatMode = "normal",
    imageParts?: { inlineData: { data: string; mimeType: string } }[]
) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `System Instruction: ${MODE_INSTRUCTIONS[mode]}` }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I will act according to these instructions." }],
                },
                ...history.map((h) => ({
                    role: h.role,
                    parts: [{ text: h.parts }],
                })),
            ],
        });

        const parts: any[] = [{ text: message }];
        if (imageParts) {
            parts.push(...imageParts);
        }

        // Add specific instruction for creative mode to generate images
        if (mode === "creative") {
            parts.push({ text: " If the user asks to generate an image, describe it in detail starting with '[IMAGE: ' and ending with ']'. Example: '[IMAGE: A futuristic city with flying cars]'. Do not generate the image yourself, just the description." });
        }

        const result = await chat.sendMessage(parts);
        const response = result.response;
        let text = response.text();

        // Parse image generation
        if (text.includes("[IMAGE:")) {
            const match = text.match(/\[IMAGE: (.*?)\]/);
            if (match) {
                const prompt = match[1];
                const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
                text = text.replace(match[0], `![Generated Image](${imageUrl})`);
            }
        }

        return text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw error;
    }
}
