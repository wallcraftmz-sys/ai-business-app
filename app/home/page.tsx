"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const cards = [
  {
    title: "Реклама",
    description: "Создать рекламный текст",
    href: "/generate/ad",
    icon: "📢",
  },
  {
    title: "Ответ клиенту",
    description: "Подготовить ответ клиенту",
    href: "/generate/reply",
    icon: "💬",
  },
  {
    title: "Описание товара",
    description: "Написать описание товара",
    href: "/generate/product",
    icon: "🏷️",
  },
  {
    title: "История",
    description: "Посмотреть прошлые тексты",
    href: "/history",
    icon: "🕘",
  },
];

type HistoryItem = {
  text: string;
  topic: string;
  type: string;
  language?: string;
  date: string;
};

function HistoryList() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(saved);
  }, []);

  if (history.length === 0) {
    return <div style={{ color: "#9eabc3" }}>Пока нет сохранённых текстов</div>;
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {history.slice(0, 5).map((item, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: 14,
            borderRadius: 16,
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 6,
              textTransform: "capitalize",
            }}
          >
            {item.type}
          </div>

          <div
            style={{
              color: "#b8c2d8",
              fontSize: 14,
              marginBottom: 6,
            }}
          >
            {item.topic || "Без темы"}
          </div>

          <div
            style={{
              color: "#99a5bc",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {item.text.slice(0, 90)}...
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
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

          <div
            style={{
              fontSize: 13,
              color: "#8d97ad",
              marginBottom: 8,
            }}
          >
            BizText AI
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 34,
              lineHeight: 1.08,
              fontWeight: 800,
            }}
          >
            AI-инструмент
            <br />
            для бизнеса
          </h1>

          <p
            style={{
              color: "#aeb7cb",
              fontSize: 16,
              lineHeight: 1.55,
              marginTop: 14,
              marginBottom: 0,
            }}
          >
            Создавай тексты для бизнеса за секунды
          </p>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {cards.map((card) => {
            const content = (
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 22,
                  padding: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background:
                        "linear-gradient(135deg, rgba(108,124,255,0.22), rgba(255,108,168,0.18))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 25,
                      flexShrink: 0,
                    }}
                  >
                    {card.icon}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      {card.title}
                    </div>

                    <div
                      style={{
                        color: "#9eabc3",
                        fontSize: 15,
                        lineHeight: 1.35,
                      }}
                    >
                      {card.description}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    color: "#9aa6be",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  ›
                </div>
              </div>
            );

            if (card.href === "#history") {
              return (
                <a
                  key={card.title}
                  href="#history"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={card.title}
                href={card.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {content}
              </Link>
            );
          })}
        </div>

        <div
          id="history"
          style={{
            marginTop: 22,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 22,
            padding: 18,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            История
          </div>

          <HistoryList />
        </div>
      </div>
    </main>
  );
}