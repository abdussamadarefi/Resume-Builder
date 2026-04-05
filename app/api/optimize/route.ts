import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { initialText, tone } = await req.json();

    if (!initialText) {
      return NextResponse.json({ error: "Missing initial text" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback for demo purposes if no key provided yet
      return NextResponse.json({ 
        suggestion: `[AI Placeholder - Configure GEMINI_API_KEY] Optimized for ${tone}: ${initialText}` 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let toneInstruction = "professional and impactful";
    if (tone === "achiever") toneInstruction = "results-oriented, focusing on achievements and metrics";
    if (tone === "concise") toneInstruction = "brief, sharp, and quickly readable";

    const prompt = `
Rewrite the following resume bullet point to make it more ${toneInstruction}.
Do not include any introductory text, quotation marks, or explanations. Just output the single requested bullet point.

Original: "${initialText}"
    `.trim();

    const result = await model.generateContent(prompt);
    const suggestion = result.response.text().trim().replace(/^[-•*]\s*/, "");

    return NextResponse.json({ suggestion });
  } catch (error: any) {
    console.error("AI Gen Error:", error);
    return NextResponse.json({ error: "Failed to optimize bullet" }, { status: 500 });
  }
}
