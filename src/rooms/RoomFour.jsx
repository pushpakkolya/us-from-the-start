import { useState, useRef } from "react";
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
  const [showBirthday, setShowBirthday] = useState(false);

  const marioRef = useRef(null);
  const princessRef = useRef(null);

  const performJump = (height = 100, isFinal = false) => {
    const duration = 700;
    const start = performance.now();

    const marioRect = marioRef.current.getBoundingClientRect();
    const princessRect = princessRef.current.getBoundingClientRect();

    const marioCenter = marioRect.left + marioRect.width / 2;
    const princessCenter = princessRect.left + princessRect.width / 2;

    const totalDistance = princessCenter - marioCenter - 40;
    const remaining = riddles.length - index;

    const dynamicStep = isFinal
      ? totalDistance
      : totalDistance / remaining;

    const startX = x;
    const endX = x + dynamicStep;

    setJumping(true);

    function animate(time) {
      const elapsed = time - start;
      const t = elapsed / duration;

      if (t < 1) {
        const progressX = startX + (endX - startX) * t;
        const progressY =
          -4 * height * (t - 0.5) * (t - 0.5) + height;

        setX(progressX);
        setY(progressY);

        requestAnimationFrame(animate);
      } else {
        setX(endX);
        setY(0);
        setJumping(false);

        if (isFinal) {
          setFinished(true);

          setTimeout(() => {
            setShowBirthday(true);
          }, 2500);
        }
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
        performJump(140, true);
      }
    }
  };

  if (showBirthday) {
    return (
      <div className="birthday-screen">
        <h1>🎉 Happy Birthday My Love 🎉</h1>
        <p>You solved every riddle…</p>
        <p>You reached the princess…</p>
        <p>And you reached my heart too ❤️</p>
        <div className="subtext">
          Thank you for being my forever player 1.
        </div>
      </div>
    );
  }

  return (
    <div className="room-four">
      <div className="world">

        <img src={cloud} className="cloud cloud1" alt="" />
        <img src={cloud} className="cloud cloud2" alt="" />

        <img
          ref={marioRef}
          src={jumping ? marioJump : marioStand}
          className={`mario ${finished ? "kiss" : ""}`}
          style={{
            transform: `translate(${50 + x}px, ${-y}px)`
          }}
          alt="mario"
        />

        <img src={castle} className="castle" alt="" />

        <img
          ref={princessRef}
          src={princess}
          className={`princess ${finished ? "bounce" : ""}`}
          alt=""
        />

        {finished && (
          <>
            <div className="heart float">💖</div>

            <div className="sparkle-container">
              <div className="sparkle s1"></div>
              <div className="sparkle s2"></div>
              <div className="sparkle s3"></div>
              <div className="sparkle s4"></div>
            </div>
          </>
        )}

      </div>

      <div className={`riddle-box ${finished ? "locked" : ""}`}>
        <h2>Help Mario reach the Princess 👑</h2>
        <p>{riddles[index].q}</p>

        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAnswer()}
        />

        <button onClick={handleAnswer}>Answer</button>
      </div>
    </div>
  );
}
