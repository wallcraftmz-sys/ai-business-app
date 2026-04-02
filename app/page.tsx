import Link from "next/link";

const cards = [
  {
    title: "Реклама",
    description: "Создать рекламный текст",
    href: "/generate?type=реклама",
    icon: "📢",
  },
  {
    title: "Ответ клиенту",
    description: "Подготовить ответ клиенту",
    href: "/generate?type=ответ",
    icon: "💬",
  },
  {
    title: "Описание товара",
    description: "Написать описание товара",
    href: "/generate?type=описание",
    icon: "🏷️",
  },
  {
    title: "История",
    description: "Посмотреть прошлые тексты",
    href: "#",
    icon: "🕘",
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #07090f 0%, #0b0f1a 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: 820,
          background: "#0d111b",
          border: "1px solid #222938",
          borderRadius: 36,
          padding: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          color: "white",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#8d95a7",
            marginBottom: 18,
          }}
        >
          AI-business-app
        </div>

        <h1
          style={{
            fontSize: 40,
            lineHeight: 1.05,
            fontWeight: 800,
            margin: "0 0 14px 0",
          }}
        >
          AI-инструмент
          <br />
          для бизнеса
        </h1>

        <p
          style={{
            color: "#aab1c2",
            fontSize: 18,
            lineHeight: 1.5,
            marginBottom: 22,
          }}
        >
          Создавай тексты для бизнеса за секунды
        </p>

        <div style={{ display: "grid", gap: 14 }}>
          {cards.map((card) => {
            const content = (
              <div
                style={{
                  background: "#141a27",
                  border: "1px solid #242c3d",
                  borderRadius: 22,
                  padding: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
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
                      width: 54,
                      height: 54,
                      borderRadius: 18,
                      background: "#1b2231",
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
                        fontSize: 20,
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      {card.title}
                    </div>

                    <div
                      style={{
                        color: "#97a0b2",
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
                    color: "#8e97aa",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  ›
                </div>
              </div>
            );

            if (card.href === "#") {
              return <div key={card.title}>{content}</div>;
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
          style={{
            marginTop: 22,
            background: "#121826",
            border: "1px solid #232b3b",
            borderRadius: 22,
            padding: 18,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            История
          </div>

          <div
            style={{
              color: "#97a0b2",
              fontSize: 15,
              lineHeight: 1.5,
            }}
          >
            Здесь позже появятся последние созданные тексты.
          </div>
        </div>
      </div>
    </main>
  );
}