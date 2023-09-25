import { useGame } from "../context/GameContext";

export const History = () => {
  const { history } = useGame();

  return (
    <div className="Sidebar">
      <h2>History</h2>
      <section style={{ display: "flex", alignItems: "center", gap: "60px" }}>
        <label>Resposta</label>
        <label>Correto?</label>
      </section>
      <ul style={{ padding: "0" }}>
        {history.map((entry, index) => (
          <li
            style={{
              marginBottom: "15px",
              listStyleType: "none",
              width: "180px",
              display: "flex",
              alignItems: "center",
              gap: "50px",
            }}
            key={index}
          >
            <div
              style={{
                textAlign: "center",
                backgroundColor: entry.answer,
                borderRadius: "3px",
                minWidth: "70px",
                maxWidth: "70px",
                padding: "10px",
              }}
            >
              {entry.answer}
            </div>
            <span
              style={{
                backgroundColor: entry.isCurrentColor ? "green" : "red",
                borderRadius: "15px",
                width: "25px",
                height: "25px",
                textAlign: "center",
              }}
            >
              {entry.isCurrentColor ? "V" : "X"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
