import OpenAI from "openai";
import { JUAN_SYSTEM_PROMPT } from "@/lib/juan-context";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const LANG_NAMES: Record<string, string> = {
      en: "English", es: "Spanish (Argentinian/rioplatense)", pt: "Portuguese",
      fr: "French", it: "Italian", zh: "Chinese", ko: "Korean", ja: "Japanese",
    };
    const langHint = LANG_NAMES[lang] || "English";
    const systemPrompt = `${JUAN_SYSTEM_PROMPT}\n\nIMPORTANT: The user has selected ${langHint} as their language. Respond in ${langHint}.`;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.85,
    });

    // Convert OpenAI stream to ReadableStream
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
