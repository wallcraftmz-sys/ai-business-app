"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [type, setType] = useState("реклама");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
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
          language: "ru",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Ошибка при генерации текста");
        return;
      }

      setResult(data.text || "");
    } catch (error) {
      console.error(error);
      setResult("Ошибка при отправке запроса");
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
        backgroundColor: "#0b0b0b",
        color: "white",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          backgroundColor: "#121212",
          border: "1px solid #2a2a2a",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          AI-генератор текстов
        </h1>

        <p
          style={{
            color: "#b3b3b3",
            marginBottom: 24,
            fontSize: 16,
          }}
        >
          Создай рекламу, пост, описание товара или письмо клиенту
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: 14,
                color: "#d4d4d4",
              }}
            >
              Выбери тип текста
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                border: "1px solid #333",
                backgroundColor: "#1b1b1b",
                color: "white",
                fontSize: 16,
              }}
            >
              <option value="реклама">Реклама</option>
              <option value="пост">Пост для соцсетей</option>
              <option value="описание">Описание товара</option>
              <option value="email">Email клиенту</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: 14,
                color: "#d4d4d4",
              }}
            >
              Тема
            </label>

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Например: доставка мебели по Риге"
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                border: "1px solid #333",
                backgroundColor: "#1b1b1b",
                color: "white",
                fontSize: 16,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: 14,
                color: "#d4d4d4",
              }}
            >
              Детали
            </label>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Например: быстро, аккуратно, до двери, Рига, от 15 евро"
              rows={6}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                border: "1px solid #333",
                backgroundColor: "#1b1b1b",
                color: "white",
                fontSize: 16,
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: 14,
              borderRadius: 12,
              border: "none",
              backgroundColor: loading ? "#3d3d3d" : "#ffffff",
              color: loading ? "#bdbdbd" : "#000000",
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? "default" : "pointer",
            }}
          >
            {loading ? "Генерируем..." : "Сгенерировать текст"}
          </button>
        </div>

        <div
          style={{
            marginTop: 28,
            padding: 18,
            borderRadius: 16,
            backgroundColor: "#181818",
            border: "1px solid #2f2f2f",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                margin: 0,
              }}
            >
              Результат
            </h2>

            <button
              onClick={handleCopy}
              disabled={!result}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #3a3a3a",
                backgroundColor: result ? "#232323" : "#161616",
                color: result ? "white" : "#666",
                cursor: result ? "pointer" : "default",
              }}
            >
              Копировать
            </button>
          </div>

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
              color: result ? "white" : "#8a8a8a",
              minHeight: 120,
            }}
          >
            {result || "Здесь появится готовый текст после генерации"}
          </div>
        </div>
      </div>
    </main>
  );
}