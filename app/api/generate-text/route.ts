import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, topic, details, tone, language } = body;

   const prompt = `
Ты умный AI помощник.

Тип: ${type}

Если type = study:
- помогай с учебой
- объясняй просто
- делай тексты как ученик

Если type = marketing:
- объясняй маркетинг простым языком
- делай тексты для новичков

Если type = social:
- делай короткие посты
- добавляй эмоции
- стиль TikTok / Instagram

Если type = cv:
- делай резюме
- деловой стиль
- без лишней воды

Если type = реклама:
- продающий текст

Если type = ответ:
- вежливый ответ клиенту

Тема: ${topic}
Информация: ${details}
Тон: ${tone}

Язык:
${language}

Пиши просто, понятно, без сложных слов.
`;

    const openai = getOpenAI();

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    return NextResponse.json({
      text: response.output_text,
    });
  } catch (error: any) {
    console.error("generate-text error:", error);

    return NextResponse.json(
      {
        error: error?.message || "Ошибка сервера",
        details: String(error),
      },
      { status: 500 }
    );
  }
}