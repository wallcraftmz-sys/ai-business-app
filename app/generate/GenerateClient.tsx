"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
  fixedType: string;
  title: string;
  subtitle: string;
};

const topicSuggestions: Record<string, string[]> = {
  ad: ["Продажа айфона", "Доставка мебели", "Салон красоты", "Кофейня"],
  reply: ["Жалоба на доставку", "Клиент просит скидку", "Нет товара в наличии", "Задержка заказа"],
  product: ["Беспроводные наушники", "Кроссовки", "Жидкие обои", "Ноутбук"],
  study: ["Объясни фотосинтез", "Помоги с эссе", "Краткий конспект темы", "План ответа"],
  marketing: ["Как продвигать магазин", "Идея акции", "Контент-план", "Реклама для Instagram"],
  social: ["Пост для TikTok", "Пост для Instagram", "Идея Stories", "Продающий пост"],
  cv: ["Резюме для продавца", "CV без опыта", "Описание навыков", "Сопроводительное письмо"],
};

const detailsSuggestions: Record<string, string[]> = {
  ad: ["Укажи выгоды, цену и призыв к действию", "Сделай коротко и цепляюще"],
  reply: ["Ответ должен быть вежливым и спокойным", "Реши проблему без конфликта"],
  product: ["Добавь преимущества и почему стоит купить", "Сделай описание понятным"],
  study: ["Объясни простым языком", "Сделай как для школьника"],
  marketing: ["Дай пошагово", "Сделай для новичка"],
  social: ["Добавь эмоции и хештеги", "Сделай короче и живее"],
  cv: ["Сделай профессионально и без воды", "Структурируй как для работодателя"],
};

export default function GenerateClient({
  fixedType,
  title,
  subtitle,
}: Props) {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [language, setLanguage] = useState("ru");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentTopicSuggestions = useMemo(
    () => topicSuggestions[fixedType] || ["Пример темы"],
    [fixedType]
  );

  const currentDetailsSuggestions = useMemo(
    () => detailsSuggestions[fixedType] || ["Сделай коротко и понятно"],
    [fixedType]
  );

  async function handleGenerate() {
    if (!topic.trim()) {
      setResult("Введите тему.");
      return;
    }

    try {
      setLoading(true);
      setCopied(false);
      setResult("");

      const res = await fetch("/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: fixedType,
          topic,
          details,
          tone: "современный, понятный, по делу",
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Ошибка. Попробуй ещё раз.");
        return;
      }

      setResult(data.text || "");

      const { error: insertError } = await supabase.from("texts").insert([
        {
          text: data.text,
          topic,
          type: fixedType,
          language,
        },
      ]);

      console.log("insertError:", insertError);

      const history = JSON.parse(localStorage.getItem("history") || "[]");

      history.unshift({
        text: data.text,
        topic,
        type: fixedType,
        language,
        date: new Date().toISOString(),
      });

      localStorage.setItem("history", JSON.stringify(history.slice(0, 20)));
    } catch (error) {
      console.log("handleGenerate error:", error);
      setResult("Ошибка запроса. Попробуй ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function fillExampleTopic(value: string) {
    setTopic(value);
  }

  function fillExampleDetails(value: string) {
    setDetails((prev) => {
      if (!prev.trim()) return value;
      return prev;
    });
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #1b2450 0%, #0a0d18 45%, #05070d 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 16px 48px",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          borderRadius: 32,
          padding: 20,
          background: "rgba(13, 17, 27, 0.82)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div
          onClick={() => router.push("/home")}
          style={{
            marginBottom: 16,
            cursor: "pointer",
            color: "#9db0ff",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          ← Назад
        </div>

        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div
            style={{
              width: 76,
              height: 76,
              margin: "0 auto 14px",
              borderRadius: 22,
              background:
                "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 40px rgba(120,100,255,0.35)",
            }}
          >
            <span style={{ fontSize: 32 }}>⚡</span>
          </div>

          <h1
            style={{
              fontSize: 32,
              margin: 0,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              color: "#aeb7cb",
              marginTop: 10,
              marginBottom: 0,
              lineHeight: 1.5,
              fontSize: 16,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div>
            <div
              style={{
                marginBottom: 8,
                color: "#cfd6e6",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Язык
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "white",
              }}
            >
              <option value="ru">Русский</option>
              <option value="lv">Latviešu</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <div
              style={{
                marginBottom: 8,
                color: "#cfd6e6",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Тема
            </div>

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Например: Продажа айфона"
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "white",
                boxSizing: "border-box",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              {currentTopicSuggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => fillExampleTopic(item)}
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#dce2f1",
                    borderRadius: 999,
                    padding: "8px 12px",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                marginBottom: 8,
                color: "#cfd6e6",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Детали
            </div>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Добавь важные детали, стиль, аудиторию, ограничения..."
              rows={5}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "white",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              {currentDetailsSuggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => fillExampleDetails(item)}
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#dce2f1",
                    borderRadius: 999,
                    padding: "8px 12px",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 18,
            border: "none",
            background: loading
              ? "#40455f"
              : "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)",
            color: "white",
            fontSize: 17,
            fontWeight: 700,
            cursor: loading ? "default" : "pointer",
            boxShadow: loading
              ? "none"
              : "0 14px 40px rgba(120,100,255,0.35)",
          }}
        >
          {loading ? "AI думает..." : "Сгенерировать"}
        </button>

        <div
          style={{
            marginTop: 20,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 20,
            padding: 14,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: 20 }}>Результат</h3>

            <button
              onClick={handleCopy}
              style={{
                fontSize: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "6px 10px",
                color: "white",
                cursor: "pointer",
              }}
            >
              {copied ? "Скопировано ✔" : "Копировать"}
            </button>
          </div>

          <textarea
            value={result || "Здесь появится готовый результат"}
            readOnly
            style={{
              width: "100%",
              minHeight: 220,
              borderRadius: 14,
              padding: 12,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#d4dbeb",
              lineHeight: 1.6,
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />

          {result && (
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              <button
                type="button"
                onClick={() => setDetails((prev) => `${prev}\nСделай короче`)}
                style={smallActionStyle}
              >
                Сделать короче
              </button>
              <button
                type="button"
                onClick={() => setDetails((prev) => `${prev}\nСделай более официально`)}
                style={smallActionStyle}
              >
                Более официально
              </button>
              <button
                type="button"
                onClick={() => setDetails((prev) => `${prev}\nСделай более продающим`)}
                style={smallActionStyle}
              >
                Более продающим
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const smallActionStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#dce2f1",
  borderRadius: 999,
  padding: "8px 12px",
  fontSize: 13,
  cursor: "pointer",
};
