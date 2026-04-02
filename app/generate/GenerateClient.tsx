"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialType: string;
};

export default function GenerateClient({ initialType }: Props) {
  const router = useRouter();

  const [type, setType] = useState(initialType || "реклама");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [language, setLanguage] = useState("ru");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    try {
      setLoading(true);
      setResult("");

      const res = await fetch("/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          topic,
          details,
          tone: "продающий",
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Ошибка");
        return;
      }

      setResult(data.text || "");

      const history = JSON.parse(localStorage.getItem("history") || "[]");

      history.unshift({
        text: data.text,
        topic,
        type,
        language,
        date: new Date().toISOString(),
      });

      localStorage.setItem("history", JSON.stringify(history.slice(0, 20)));
    } catch {
      setResult("Ошибка запроса");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #07090f 0%, #0b0f1a 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: 820,
          background: "#0d111b",
          border: "1px solid #222938",
          borderRadius: 36,
          padding: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          color: "white",
        }}
      >
        <div
          onClick={() => router.push("/")}
          style={{
            marginBottom: 16,
            cursor: "pointer",
            color: "#8fa3ff",
            fontSize: 16,
          }}
        >
          ← Назад
        </div>

        <h1 style={{ fontSize: 28, marginBottom: 10 }}>
          Генерация текста
        </h1>

        <p style={{ color: "#9aa3b2", marginBottom: 16 }}>
          Создай текст с помощью AI
        </p>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "1px solid #333",
            background: "#1b1f2a",
            color: "white",
            marginBottom: 12,
          }}
        >
          <option value="реклама">Реклама</option>
          <option value="ответ">Ответ клиенту</option>
          <option value="описание">Описание товара</option>
          <option value="email">Email</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "1px solid #333",
            background: "#1b1f2a",
            color: "white",
            marginBottom: 12,
          }}
        >
          <option value="ru">Русский</option>
          <option value="lv">Latviešu</option>
          <option value="en">English</option>
        </select>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Тема (например: доставка мебели)"
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "1px solid #333",
            background: "#1b1f2a",
            color: "white",
            marginBottom: 12,
            boxSizing: "border-box",
          }}
        />

        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Детали..."
          rows={5}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "1px solid #333",
            background: "#1b1f2a",
            color: "white",
            marginBottom: 14,
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 14,
            border: "none",
            background: loading ? "#3a3a3a" : "#4CAF50",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Генерация..." : "Сгенерировать"}
        </button>

        <div
          style={{
            marginTop: 20,
            background: "#141822",
            borderRadius: 16,
            padding: 14,
            border: "1px solid #2a2f3c",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div>Результат</div>

            <button
              onClick={handleCopy}
              style={{
                fontSize: 12,
                background: "#222",
                border: "1px solid #444",
                borderRadius: 8,
                padding: "4px 8px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Копировать
            </button>
          </div>

          <div style={{ color: "#c9d1d9", lineHeight: 1.5 }}>
            {result || "Здесь появится текст"}
          </div>
        </div>
      </div>
    </main>
  );
}