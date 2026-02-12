import { useState } from "react";

export default function Landing({ onStart }) {
  const [message, setMessage] = useState("");

  const dramaticLines = [
    "🥺 Oh… okay.",
    "😢 Are you sure?",
    "🥹 That made my heart wobble a little.",
    "😞 Bubba please…",
    "😭 I dressed up for this.",
    "💔 That hurt more than I expected.",
    "🥺 I promise it’s worth it.",
    "😢 Just one tiny yes?",
    "🥹 I’m getting nervous now.",
    "😭 Okay… this is getting personal."
  ];

  const handleNo = () => {
    const randomIndex = Math.floor(Math.random() * dramaticLines.length);
    setMessage(dramaticLines[randomIndex]);
  };

  const handleYes = () => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.play().catch(() => {});
    }

    if (typeof onStart === "function") {
      onStart();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Georgia', serif",
        textAlign: "center",
        background: "linear-gradient(to bottom, #fff5f7, #fde2e4)",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "30px" }}>
        Are you ready?
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={handleYes}
          style={{
            padding: "12px 28px",
            fontSize: "18px",
            borderRadius: "30px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#c9184a",
            color: "white",
          }}
        >
          Yes ❤️
        </button>

        <button
          onClick={handleNo}
          style={{
            padding: "12px 28px",
            fontSize: "18px",
            borderRadius: "30px",
            border: "2px solid #c9184a",
            backgroundColor: "white",
            cursor: "pointer",
            color: "#c9184a",
          }}
        >
          No 🙈
        </button>
      </div>

      {message && (
        <p
          style={{
            marginTop: "40px",
            fontSize: "20px",
            opacity: 0.85,
            transition: "all 0.3s ease",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
