import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, topic, details, tone, language } = body;

    const prompt = `
Ты помощник для бизнеса.

Сгенерируй текст в зависимости от типа:

Тип: ${type}

Если это:
- реклама → сделай продающий текст
- пост → сделай живой пост
- описание → сделай описание товара
- email → сделай деловое письмо

Тема: ${topic}
Информация: ${details}
Тон: ${tone}
Язык: ${language}

Пиши коротко, понятно и по делу.
Не выдумывай факты.
`;

const openai = getOpenAI();
    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    return NextResponse.json({
      text: response.output_text,
    });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}