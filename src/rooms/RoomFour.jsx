import { useState } from "react";
import "./RoomFour.css";

import marioStand from "../assets/mario/mario-stand.png";
import princess from "../assets/mario/princess.png";
import castle from "../assets/mario/castle.png";
import cloud from "../assets/mario/cloud.png";

const riddles = [
  { q: "What has to be broken before you can use it?", a: "egg" },
  { q: "I’m tall when I’m young, short when I’m old.", a: "candle" },
  { q: "What has hands but can’t clap?", a: "clock" },
  { q: "What gets wetter the more it dries?", a: "towel" },
  { q: "What has keys but can’t open locks?", a: "piano" }
];

export default function RoomFour() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  const STEP = 100;

  const handleAnswer = () => {
    if (input.toLowerCase().trim() === riddles[index].a) {
      setProgress(p => p + STEP);

      if (index < riddles.length - 1) {
        setIndex(i => i + 1);
        setInput("");
      } else {
        setFinished(true);
      }
    }
  };

  return (
    <div className="room-four">

      <div className="world">
        <img src={cloud} className="cloud cloud1" alt="" />
        <img src={cloud} className="cloud cloud2" alt="" />

        <img
          src={marioStand}
          className="mario"
          style={{ left: 50 + progress }}
          alt="mario"
        />

        <img src={castle} className="castle" alt="" />
        <img src={princess} className="princess" alt="" />

        {finished && <div className="heart">💖</div>}
      </div>

      {!finished && (
        <div className="riddle-box">
          <h2>Help Mario reach the Princess 👑</h2>
          <p>{riddles[index].q}</p>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAnswer()}
          />
          <button onClick={handleAnswer}>Answer</button>
        </div>
      )}
    </div>
  );
}
