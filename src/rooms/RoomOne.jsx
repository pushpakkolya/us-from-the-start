import { useState } from "react";

export default function RoomOne({ onComplete }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    const formatted = answer.toLowerCase().trim();

    if (
      formatted.includes("first") &&
      formatted.includes("met")
    ) {
      if (typeof onComplete === "function") {
        onComplete();
      }
    } else {
      alert("Hmm… try again ❤️");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h2>Room One — Memory</h2>
      <p>What was the first thing we talked about?</p>

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          fontSize: "16px",
        }}
      />

      <br /><br />

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Unlock 🔓
      </button>
    </div>
  );
}
