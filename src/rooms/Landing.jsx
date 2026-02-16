import { useState } from "react";
import "./Landing.css";

export default function Landing({ onStart }) {
  const [message, setMessage] = useState("");
  const [lastIndex, setLastIndex] = useState(null);
  const [noCount, setNoCount] = useState(0);

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
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * dramaticLines.length);
    } while (randomIndex === lastIndex);

    setLastIndex(randomIndex);
    setMessage(dramaticLines[randomIndex]);
    setNoCount(prev => prev + 1);
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

  const yesScale = Math.min(1 + noCount * 0.08, 1.8);

  return (
    <div className="landing-container">

      {/* Floating petals */}
      <div className="petals">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="petal">🌸</span>
        ))}
      </div>

      {/* Soft glow orbs */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>
      <div className="glow glow3"></div>

      <h1 className="landing-title">
        Are you ready? 💕
      </h1>

      <p className="subtitle">
        I made something special just for you…
      </p>

      <div className="button-group">
        <button
          className="yes-btn"
          onClick={handleYes}
          style={{ transform: `scale(${yesScale})` }}
        >
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
