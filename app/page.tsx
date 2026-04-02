"use client";

import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 20%, #1b2440 0%, #05070d 60%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 28,
          borderRadius: 32,
          background: "rgba(20, 26, 40, 0.65)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* LOGO */}
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div
            style={{
              width: 90,
              height: 90,
              margin: "0 auto",
              borderRadius: 24,
              background:
                "linear-gradient(135deg, #6c7cff, #b26cff, #ff6c9c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(120,120,255,0.4)",
            }}
          >
            <span style={{ fontSize: 36 }}>⚡</span>
          </div>
        </div>

        {/* TITLE */}
        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          BizText AI
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#9aa3b2",
            fontSize: 15,
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          Генерируй тексты, рекламу и ответы клиентам за секунды
        </p>

        {/* FEATURES */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 18,
            padding: 16,
            marginBottom: 26,
            fontSize: 14,
            color: "#cbd3e1",
            lineHeight: 1.7,
          }}
        >
          • Реклама для бизнеса  
          <br />
          • Ответы клиентам  
          <br />
          • Описание товаров  
        </div>

        {/* BUTTON LOGIN */}
        <button
          onClick={() => router.push("/home")}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 18,
            border: "none",
            background:
              "linear-gradient(135deg, #6c7cff, #b26cff)",
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 12,
            boxShadow: "0 10px 30px rgba(100,100,255,0.4)",
          }}
        >
          Войти
        </button>

        {/* BUTTON GUEST */}
        <button
          onClick={() => router.push("/home")}
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            color: "white",
            fontSize: 15,
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