import { useState } from "react";
import "./RoomOne.css";

export default function RoomOne({ onComplete }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [showTransition, setShowTransition] = useState(false);

  const handleSubmit = () => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.play().catch(() => {});
    }

    const formatted = answer.toLowerCase().trim();

    if (
      formatted.includes("blueberry") &&
      formatted.includes("cheesecake")
    ) {
      setError("");
      setShowTransition(true);

      // Delay before moving to next room
      setTimeout(() => {
        if (typeof onComplete === "function") {
          onComplete();
        }
      }, 2200);

    } else {
      setError("Hmm… try again ❤️");
    }
  };

  return (
    <div className="roomone-container">
      {/* Glow Background */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>
      <div className="glow glow3"></div>

      {/* Sparkles */}
      <div className="sparkle">✨</div>
      <div className="sparkle">✨</div>
      <div className="sparkle">✨</div>

      {/* Subtle Doodles */}
      <div className="doodle doodle1">💌</div>
      <div className="doodle doodle2">💗</div>

      <div className={`room-card ${showTransition ? "success-glow" : ""}`}>
        <h2 className="room-title">Room One — Our First Memory</h2>

        <p className="room-question">
          Think back in time… what was the first dessert we ate together🤤 ?
        </p>

        <input
          className="room-input"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your memory here..."
          disabled={showTransition}
        />

        <button
          type="button"
          className="unlock-btn"
          onClick={handleSubmit}
          disabled={showTransition}
        >
          Unlock 🔓
        </button>

        {error && <div className="error-text">{error}</div>}

        {showTransition && (
          <div className="transition-message">
            The game is just getting started 😌✨
          </div>
        )}
      </div>
    </div>
  );
}
