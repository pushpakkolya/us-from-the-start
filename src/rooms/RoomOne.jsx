import { useState } from "react";
import "./RoomOne.css";

export default function RoomOne({ onComplete }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.play().catch(() => {});
    }

    const formatted = answer.toLowerCase().trim();

    if (
      formatted.includes("June") &&
      formatted.includes("8")
    ) {
      if (typeof onComplete === "function") {
        onComplete();
      }
    } else {
      setError("Hmm… try again ❤️");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="roomone-container">

      {/* Glow Background Elements */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>
      <div className="glow glow3"></div>

      <div className="room-card">
        <h2 className="room-title">Room One — Memory 💭</h2>

        <p className="room-question">
          When was our First Date 💘🙈?
        </p>

        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="room-input"
          placeholder="Type your answer here..."
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="unlock-btn"
        >
          Unlock 🔓
        </button>

        {error && (
          <p className="error-text">{error}</p>
        )}
      </div>
    </div>
  );
}
