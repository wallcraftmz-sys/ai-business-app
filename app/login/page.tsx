"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    localStorage.setItem(
      "session",
      JSON.stringify({
        email,
        loggedIn: true,
      })
    );

    router.push("/home");
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
        <div
          onClick={() => router.push("/")}
          style={{
            marginBottom: 16,
            cursor: "pointer",
            color: "#9db0ff",
            fontSize: 16,
          }}
        >
          ← Назад
        </div>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              margin: "0 auto 18px",
              borderRadius: 28,
              background:
                "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 18px 50px rgba(120,100,255,0.45)",
            }}
          >
            <span style={{ fontSize: 42 }}>⚡</span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 36,
              fontWeight: 800,
              marginBottom: 10,
            }}
          >
            Вход
          </h1>

          <p
            style={{
              margin: 0,
              color: "#aeb7cb",
              fontSize: 16,
              lineHeight: 1.55,
            }}
          >
            Войди в BizText AI, чтобы пользоваться приложением
          </p>
        </div>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            marginBottom: 12,
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          style={{
            width: "100%",
            padding: 16,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            marginBottom: 18,
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
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