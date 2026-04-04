"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type TextItem = {
  id: string;
  text: string;
  topic: string | null;
  type: string | null;
  language: string | null;
  created_at: string;
};

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<TextItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    setLoading(true);

    const { data, error } = await supabase
      .from("texts")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("history data:", data);
    console.log("history error:", error);

    if (!error && data) {
      setHistory(data);
    }

    setLoading(false);
  }

  async function clearHistory() {
    const { error } = await supabase
      .from("texts")
      .delete()
      .not("id", "is", null);

    console.log("clearHistory error:", error);

    if (!error) {
      setHistory([]);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

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

        <h1
          style={{
            fontSize: 30,
            margin: 0,
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          История
        </h1>

        <p
          style={{
            color: "#aeb7cb",
            marginTop: 0,
            marginBottom: 16,
          }}
        >
          Все сохранённые тексты из базы
        </p>

        <button
          onClick={clearHistory}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            marginBottom: 16,
            cursor: "pointer",
          }}
        >
          Очистить историю
        </button>

        <div style={{ display: "grid", gap: 12 }}>
          {loading ? (
            <div style={{ color: "#9eabc3" }}>Загрузка...</div>
          ) : history.length === 0 ? (
            <div style={{ color: "#9eabc3" }}>История пока пустая</div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 18,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 6 }}>
                  {item.type || "Без типа"}
                </div>

                <div style={{ color: "#b8c2d8", marginBottom: 6 }}>
                  {item.topic || "Без темы"}
                </div>

                <div
                  style={{
                    color: "#99a5bc",
                    lineHeight: 1.6,
                    marginBottom: 8,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {item.text}
                </div>

                <div style={{ color: "#7f8aa3", fontSize: 12 }}>
                  {item.language || "ru"} •{" "}
                  {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}