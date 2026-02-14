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

export default function RoomFour() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [finished, setFinished] = useState(false);

  const STEP = 120;

  const performJump = (height = 100) => {
    const duration = 700;
    const start = performance.now();
    const startX = x;
    const endX = x + STEP;

    setJumping(true);

    function animate(time) {
      const elapsed = time - start;
      const t = elapsed / duration;

      if (t < 1) {
        const progressX = startX + (endX - startX) * t;

        // REAL PARABOLA
        const progressY = -4 * height * (t - 0.5) * (t - 0.5) + height;

        setX(progressX);
        setY(progressY);

        requestAnimationFrame(animate);
      } else {
        setX(endX);
        setY(0);
        setJumping(false);
      }
    }

    requestAnimationFrame(animate);
  };

  const handleAnswer = () => {
    if (input.toLowerCase().trim() === riddles[index].a) {

      if (index < riddles.length - 1) {
        performJump();
        setIndex(i => i + 1);
        setInput("");
      } else {
        performJump(140); // bigger final jump
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
          src={jumping ? marioJump : marioStand}
          className="mario"
          style={{
            transform: `translate(${50 + x}px, ${-y}px)`
          }}
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
