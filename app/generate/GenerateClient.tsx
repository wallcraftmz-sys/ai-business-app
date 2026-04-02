"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  fixedType: string;
  title: string;
  subtitle: string;
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
          type: fixedType,
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
        type: fixedType,
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
        background:
          "radial-gradient(circle at top left, #1b2450 0%, #0a0d18 45%, #05070d 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 16px",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: 820,
          borderRadius: 36,
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
          }}
        >
          ← Назад
        </div>

        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
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
            <span style={{ fontSize: 30 }}>⚡</span>
          </div>

          <h1 style={{ fontSize: 30, margin: 0, fontWeight: 800 }}>
            {title}
          </h1>

          <p
            style={{
              color: "#aeb7cb",
              marginTop: 10,
              marginBottom: 0,
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
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
          placeholder="Тема"
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
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
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            marginBottom: 14,
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />

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
          {loading ? "Генерация..." : "Сгенерировать"}
        </button>

        <div
          style={{
            marginTop: 20,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 18,
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
            <div style={{ fontWeight: 700 }}>Результат</div>

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
              Копировать
            </button>
          </div>

          <div
            style={{
              color: "#d4dbeb",
              lineHeight: 1.6,
              minHeight: 90,
              whiteSpace: "pre-wrap",
            }}
          >
            {result || "Здесь появится текст"}
          </div>
        </div>
      </div>
    </main>
  );
}