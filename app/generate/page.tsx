"use client";

import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");

  async function generate() {
    const res = await fetch("/api/generate-text", {
      method: "POST",
      body: JSON.stringify({
        type: "реклама",
        topic: "доставка мебели",
        details: "быстро, Рига, до двери",
        tone: "продающий",
        language: "ru",
      }),
    });

    const data = await res.json();
    setText(data.text);
  }

  return (
    <div style={{ padding: 40 }}>
      <button onClick={generate}>Сгенерировать</button>
      <p>{text}</p>
    </div>
  );
}