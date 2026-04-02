"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
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
            padding: 24,
            background: "rgba(13, 17, 27, 0.82)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
            backdropFilter: "blur(18px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 126,
              height: 126,
              borderRadius: 34,
              background:
                "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.05), 0 18px 50px rgba(120,100,255,0.45)",
              position: "relative",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -18,
                borderRadius: 40,
                background:
                  "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)",
                filter: "blur(36px)",
                opacity: 0.4,
                zIndex: 0,
              }}
            />
            <span
              style={{
                fontSize: 54,
                zIndex: 1,
              }}
            >
              ⚡
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 38,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 10,
            }}
          >
            BizText AI
          </h1>

          <p
            style={{
              margin: 0,
              color: "#aeb7cb",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            AI-инструмент для бизнеса
          </p>
        </div>
      </main>
    );
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
          padding: 24,
          background: "rgba(13, 17, 27, 0.82)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          backdropFilter: "blur(18px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 110,
              height: 110,
              margin: "0 auto 18px",
              borderRadius: 30,
              background:
                "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.05), 0 18px 50px rgba(120,100,255,0.45)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -14,
                borderRadius: 36,
                background:
                  "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)",
                filter: "blur(30px)",
                opacity: 0.35,
                zIndex: 0,
              }}
            />
            <span style={{ fontSize: 46, zIndex: 1 }}>⚡</span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 42,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            BizText AI
          </h1>

          <p
            style={{
              margin: "14px 0 0",
              color: "#aeb7cb",
              fontSize: 18,
              lineHeight: 1.55,
            }}
          >
            Генерируй тексты, рекламу и ответы клиентам за секунды
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 22,
            padding: 18,
            marginBottom: 22,
            color: "#d4dbeb",
            fontSize: 16,
            lineHeight: 1.8,
          }}
        >
          • Реклама для бизнеса
          <br />
          • Ответы клиентам
          <br />
          • Описание товаров
        </div>

        <button
          onClick={() => router.push("/login")}
          style={{
            width: "100%",
            padding: 17,
            borderRadius: 18,
            border: "none",
            background:
              "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)",
            color: "white",
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 14px 40px rgba(120,100,255,0.35)",
            marginBottom: 12,
          }}
        >
          Войти
        </button>

        <button
          onClick={() => router.push("/home")}
          style={{
            width: "100%",
            padding: 17,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            color: "white",
            fontSize: 17,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Продолжить без входа
        </button>
      </div>
    </main>
  );
}