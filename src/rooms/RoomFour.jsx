import { useState, useEffect } from "react";
import "./RoomFour.css";

const riddlesPool = [
  { q: "What has to be broken before you can use it?", a: "egg" },
  { q: "I’m tall when I’m young, short when I’m old. What am I?", a: "candle" },
  { q: "What has hands but can’t clap?", a: "clock" },
  { q: "What has a heart that doesn’t beat?", a: "artichoke" },
  { q: "What runs but never walks?", a: "water" },
  { q: "What has one eye but can’t see?", a: "needle" },
  { q: "What gets wetter the more it dries?", a: "towel" },
  { q: "What has a neck but no head?", a: "bottle" },
  { q: "What can travel around the world while staying in a corner?", a: "stamp" },
  { q: "What has keys but can’t open locks?", a: "piano" }
];

function getRandomRiddles(count = 5) {
  const shuffled = [...riddlesPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function RoomFour({ onComplete }) {
  const [riddles] = useState(getRandomRiddles());
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [jump, setJump] = useState(false);
  const [coins, setCoins] = useState([]);
  const [finished, setFinished] = useState(false);
  const [pan, setPan] = useState(false);

  const handleSubmit = () => {
    if (input.toLowerCase().trim() === riddles[index].a) {
      setJump(true);
      setProgress(p => p + 1);

      // Add coin animation
      setCoins(c => [...c, Date.now()]);

      setTimeout(() => setJump(false), 400);

      if (index < riddles.length - 1) {
        setIndex(i => i + 1);
        setInput("");
      } else {
        setTimeout(() => {
          setPan(true);
          setFinished(true);
        }, 600);
      }
    }
  };

  return (
    <div className="room-four">

      {/* GAME SIDE */}
      <div className={`game-area ${pan ? "pan" : ""}`}>

        <div className="cloud cloud1" />
        <div className="cloud cloud2" />

        <div className={`mario ${jump ? "jump" : ""}`} />
        <div className="ground" />

        {coins.map(id => (
          <div key={id} className="coin" />
        ))}

        {finished && (
          <>
            <div className="castle" />
            <div className="princess" />
            <div className="heart-burst" />
            <div className="final-text">
              Mario found his princess 💖
            </div>
          </>
        )}
      </div>

      {/* RIDDLE SIDE */}
      {!finished && (
        <div className="riddle-area">
          <h2>Help Mario reach his princess 💌</h2>
          <p>{riddles[index].q}</p>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
          <button onClick={handleSubmit}>Answer</button>
        </div>
      )}
    </div>
  );
}
