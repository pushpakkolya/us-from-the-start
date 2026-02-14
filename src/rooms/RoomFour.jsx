import { useState } from "react";
import "./RoomFour.css";

import marioStand from "../assets/mario/mario-stand.png";
import marioJump from "../assets/mario/mario-jump.png";
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

export default function RoomFour({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const STEP = 100;

  const performJump = (height = 80) => {
    const duration = 600;
    const start = performance.now();

    function animate(time) {
      const elapsed = time - start;
      const t = elapsed / duration;

      if (t < 1) {
        const y = -4 * height * (t - 0.5) * (t - 0.5) + height;
        setYOffset(y);
        requestAnimationFrame(animate);
      } else {
        setYOffset(0);
      }
    }

    requestAnimationFrame(animate);
  };

  const handleAnswer = () => {
    if (input.toLowerCase().trim() === riddles[index].a) {
      setJumping(true);
      performJump();
      setProgress(p => p + STEP);

      setTimeout(() => setJumping(false), 600);

      if (index < riddles.length - 1) {
        setIndex(i => i + 1);
        setInput("");
      } else {
        setTimeout(() => {
          performJump(120); // bigger final jump
          setFinished(true);
          setShowHeart(true);

          setTimeout(() => {
            if (onComplete) onComplete();
          }, 3000);
        }, 700);
      }
    }
  };

  return (
    <div className="room-four">

      {/* GAME WORLD */}
      <div className="world">

        <img src={cloud} className="cloud cloud1" alt="" />
        <img src={cloud} className="cloud cloud2" alt="" />

        <img
          src={jumping ? marioJump : marioStand}
          className="mario"
          style={{
            left: 50 + progress,
            bottom: 80 + yOffset
          }}
          alt="mario"
        />

        <img src={castle} className="castle" alt="" />
        <img
          src={princess}
          className={`princess ${finished ? "bounce" : ""}`}
          alt=""
        />

        {showHeart && <div className="heart">💖</div>}
      </div>

      {/* RIDDLE BOX AT BOTTOM */}
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
