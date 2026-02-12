import { useState } from "react";

export default function RoomOne({ onComplete }) {
  const [answer, setAnswer] = useState("");

  const correctAnswer = "first time you met";

  const handleSubmit = () => {
    if (answer.toLowerCase().trim() === correctAnswer) {
      onComplete();
    } else {
      alert("Hmm… try again ❤️");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>Room One — Memory</h2>
      <p>What was the first thing we talked about?</p>

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Unlock 🔓
      </button>
    </div>
  );
}
