"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TabKey = "business" | "growth" | "service";

const sections = {
  business: {
    title: "Бизнес",
    icon: "💰",
    subtitle: "Продажи, клиенты и товары",
    items: [
      {
        title: "Продать товар",
        subtitle: "Продающий текст для товара или услуги",
        href: "/generate/ad",
      },
      {
        title: "Ответить клиенту",
        subtitle: "Вежливый и понятный ответ",
        href: "/generate/reply",
      },
      {
        title: "Описание товара",
        subtitle: "Кратко и убедительно описать товар",
        href: "/generate/product",
      },
    ],
  },
  growth: {
    title: "Развитие",
    icon: "🎓",
    subtitle: "Учёба, маркетинг, соцсети и карьера",
    items: [
      {
        title: "Учёба",
        subtitle: "Помощь для школы и университета",
        href: "/generate/study",
      },
      {
        title: "Маркетинг",
        subtitle: "Идеи и тексты для новичков",
        href: "/generate/marketing",
      },
      {
        title: "Соцсети",
        subtitle: "Посты для TikTok, Instagram и Telegram",
        href: "/generate/social",
      },
      {
        title: "Резюме",
        subtitle: "CV и тексты для работы",
        href: "/generate/cv",
      },
    ],
  },
  service: {
    title: "Сервис",
    icon: "⚙️",
    subtitle: "История и дополнительные функции",
    items: [
      {
        title: "История",
        subtitle: "Посмотреть прошлые тексты",
        href: "/history",
      },
    ],
  },
};

const quickActions = [
  { title: "Продать", href: "/generate/ad", icon: "🚀" },
  { title: "Ответить", href: "/generate/reply", icon: "💬" },
  { title: "Пост", href: "/generate/social", icon: "📱" },
  { title: "CV", href: "/generate/cv", icon: "🧑‍💼" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("business");

  const currentSection = useMemo(() => sections[activeTab], [activeTab]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #1b2450 0%, #0a0d18 45%, #05070d 100%)",
        display: "flex",
        justifyContent: "center",
        padding: "20px 16px 110px",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
        }}
      >
        <div
          style={{
            background: "rgba(13, 17, 27, 0.82)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
            backdropFilter: "blur(18px)",
            borderRadius: 32,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 82,
              height: 82,
              margin: "0 auto 14px",
              borderRadius: 24,
              background:
                "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 14px 40px rgba(120,100,255,0.35)",
              fontSize: 34,
            }}
          >
            ⚡
          </div>

          <h1
            style={{
              fontSize: 38,
              lineHeight: 1.05,
              fontWeight: 800,
              margin: "0 0 10px 0",
              textAlign: "center",
            }}
          >
            BizText AI
          </h1>

          <p
            style={{
              color: "#aeb7cb",
              textAlign: "center",
              lineHeight: 1.5,
              fontSize: 17,
              margin: "0 0 16px 0",
            }}
          >
            AI-помощник для бизнеса, учёбы,
            <br />
            соцсетей, маркетинга и работы.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            {quickActions.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontWeight: 700,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "rgba(13, 17, 27, 0.82)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            backdropFilter: "blur(18px)",
            borderRadius: 28,
            padding: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 24 }}>{currentSection.icon}</span>
            <h2
              style={{
                margin: 0,
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              {currentSection.title}
            </h2>
          </div>

          <div
            style={{
              color: "#aeb7cb",
              fontSize: 15,
              lineHeight: 1.45,
              marginBottom: 14,
            }}
          >
            {currentSection.subtitle}
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {currentSection.items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20,
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        color: "#aeb7cb",
                        fontSize: 14,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.subtitle}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: 24,
                      color: "#9db0ff",
                      flexShrink: 0,
                    }}
                  >
                    ›
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 16,
            transform: "translateX(-50%)",
            width: "calc(100% - 24px)",
            maxWidth: 460,
            background: "rgba(10, 14, 24, 0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            borderRadius: 22,
            padding: 10,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          }}
        >
          <TabButton
            active={activeTab === "business"}
            icon="💰"
            label="Бизнес"
            onClick={() => setActiveTab("business")}
          />
          <TabButton
            active={activeTab === "growth"}
            icon="🎓"
            label="Развитие"
            onClick={() => setActiveTab("growth")}
          />
          <TabButton
            active={activeTab === "service"}
            icon="⚙️"
            label="Сервис"
            onClick={() => setActiveTab("service")}
          />
        </div>
      </div>
    </main>
  );
}

function TabButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: 16,
        padding: "12px 8px",
        background: active
          ? "linear-gradient(135deg, #6c7cff 0%, #a95cff 45%, #ff6ca8 100%)"
          : "rgba(255,255,255,0.04)",
        color: "white",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        fontWeight: 700,
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 13 }}>{label}</span>
    </button>
  );
}