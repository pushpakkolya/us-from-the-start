import { useState } from "react";
import "./Landing.css";

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
    <div className="landing-container">

      {/* Floating Petals */}
      <div className="petals">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="petal">🌸</span>
        ))}
      </div>

      <h1 className="landing-title">
        Are you ready? 💕
      </h1>

      <div className="button-group">
        <button className="yes-btn" onClick={handleYes}>
          Yes ❤️
        </button>

        <button className="no-btn" onClick={handleNo}>
          No 🙈
        </button>
      </div>

      {message && (
        <p className="dramatic-message">
          {message}
        </p>
      )}
    </div>
  );
}
