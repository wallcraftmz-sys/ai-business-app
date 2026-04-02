import Link from "next/link";

const cards = [
  {
    title: "Реклама",
    description: "Создать рекламный текст для бизнеса",
    href: "/generate?type=реклама",
    icon: "📢",
  },
  {
    title: "Ответ клиенту",
    description: "Подготовить ответ на сообщение клиента",
    href: "/generate?type=ответ",
    icon: "💬",
  },
  {
    title: "Описание товара",
    description: "Написать описание товара или услуги",
    href: "/generate?type=описание",
    icon: "🏷️",
  },
  {
    title: "История",
    description: "Посмотреть сохранённые тексты позже",
    href: "#",
    icon: "🕘",
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #090909 0%, #0d0d0d 100%)",
        color: "white",
        padding: "32px 20px 48px",
      }}
    >
      <div
        style={{
          maxWidth: 780,
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 14,
              color: "#8f8f8f",
              marginBottom: 14,
            }}
          >
            AI-business-app
          </div>

          <h1
            style={{
              fontSize: 42,
              lineHeight: 1.1,
              margin: 0,
              fontWeight: 800,
            }}
          >
            AI-инструмент
            <br />
            для бизнеса
          </h1>

          <p
            style={{
              color: "#b3b3b3",
              fontSize: 18,
              lineHeight: 1.6,
              marginTop: 16,
              maxWidth: 560,
            }}
          >
            Создавай рекламные тексты, ответы клиентам и описания
            товаров за секунды.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {cards.map((card) => {
            const content = (
              <div
                style={{
                  backgroundColor: "#141414",
                  border: "1px solid #2a2a2a",
                  borderRadius: 22,
                  padding: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 16,
                      backgroundColor: "#1f1f1f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    }}
                  >
                    {card.icon}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 30,
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {card.title}
                    </div>

                    <div
                      style={{
                        color: "#a8a8a8",
                        fontSize: 18,
                        lineHeight: 1.4,
                      }}
                    >
                      {card.description}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 28,
                    color: "#8d8d8d",
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
            backgroundColor: "#121212",
            border: "1px solid #262626",
            borderRadius: 22,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            История
          </div>

          <div
            style={{
              color: "#a5a5a5",
              lineHeight: 1.6,
              fontSize: 16,
            }}
          >
            Здесь позже появятся последние сгенерированные тексты.
          </div>
        </div>
      </div>
    </main>
  );
}