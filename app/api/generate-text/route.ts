import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, topic, details, tone, language } = body;

   const prompt = `
Ты AI помощник, который РЕШАЕТ ЗАДАЧУ пользователя.

Тип: ${type}

Правила:

Если type = ad:
— сделай продающий текст
— добавь заголовок
— добавь призыв (CTA)

Если type = reply:
— ответ должен быть вежливым
— коротким
— решать проблему клиента

Если type = product:
— описание товара
— преимущества
— почему купить

Если type = study:
— объясняй ПРОСТО
— как для ученика
— без сложных слов

Если type = marketing:
— объясни как сделать
— добавь шаги
— дай советы

Если type = social:
— пост для соцсетей
— коротко
— добавь эмоции
— добавь хештеги

Если type = cv:
— профессионально
— структурировано
— без воды

Тема: ${topic}
Детали: ${details}
Язык: ${language}

ВАЖНО:
— не выдумывай факты
— пиши чётко
— делай готовый результат
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