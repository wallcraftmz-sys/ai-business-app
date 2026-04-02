"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "реклама",
        topic,
        details,
        tone: "продающий",
        language: "ru",
      }),
    });

    const data = await res.json();
    setResult(data.text);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 30 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        Генератор рекламы
      </h1>

      <input
        placeholder="Например: доставка мебели"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <textarea
        placeholder="Напиши детали (быстро, Рига, до двери...)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button
        onClick={handleGenerate}
        style={{ padding: 12, cursor: "pointer" }}
      >
        {loading ? "Генерируем..." : "Сгенерировать"}
      </button>

      <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {result}
      </div>
    </main>
  );
}