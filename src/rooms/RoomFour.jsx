import { useState } from "react";
import "./RoomFour.css";

import marioStand from "../assets/mario/mario-stand.png";
import marioJump from "../assets/mario/mario-jump.png";
import princess from "../assets/mario/princess.png";
import coinImg from "../assets/mario/coin.png";
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
  const [jumping, setJumping] = useState(false);
  const [coins, setCoins] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = () => {
    if (input.toLowerCase().trim() === riddles[index].a) {
      setJumping(true);
      setProgress(p => p + 80);
      setCoins(c => [...c, Date.now()]);

      setTimeout(() => setJumping(false), 400);

      if (index < riddles.length - 1) {
        setIndex(i => i + 1);
        setInput("");
      } else {
        setTimeout(() => setFinished(true), 800);
      }
    }
  };

  return (
    <div className="room-four">

      {/* GAME WORLD */}
      <div className={`world ${finished ? "pan" : ""}`}>

        <img src={cloud} className="cloud cloud1" alt="" />
        <img src={cloud} className="cloud cloud2" alt="" />

        <img
          src={jumping ? marioJump : marioStand}
          className={`mario ${jumping ? "jump" : ""}`}
          style={{ transform: `translateX(${progress}px)` }}
          alt="mario"
        />

        {coins.map(id => (
          <img
            key={id}
            src={coinImg}
            className="coin"
            style={{ left: progress + 40 }}
            alt=""
          />
        ))}

        <img src={castle} className="castle" alt="" />
        <img src={princess} className="princess" alt="" />

        {finished && <div className="heart">💖</div>}
      </div>

      {/* RIDDLE UI */}
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
