import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, topic, details, tone, language } = body;

    const prompt = `
Ты помощник для бизнеса.

Сгенерируй текст:
Тип: ${type}
Тема: ${topic}
Информация: ${details}
Тон: ${tone}
Язык: ${language}

Пиши коротко и понятно.
Не выдумывай лишнего.
`;

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