import { useState, useRef } from "react";
import "./RoomFour.css";

import marioStand from "../assets/mario/mario-stand.png";
import marioJump from "../assets/mario/mario-jump.png";
import princess from "../assets/mario/princess.png";
import castle from "../assets/mario/castle.png";
import cloud from "../assets/mario/cloud.png";

const riddles = [
  {
    q: "When was our first date? 💖",
    a: ["june 8", "8 june", "june 8 2025", "8 june 2025", "8/6/2025", "08/06/2025"]
  },
  {
    q: "You’re not a building, yet I say I feel like I belong here whenever You’re around. What am I? 🏡",
    a: ["home"]
  },
  {
    q: "I’m something you give me without wrapping it. Every time you do, the world suddenly feels calmer, warmer and lighter. What am I? 🤗",
    a: ["hug", "cuddle"]
  },
  {
    q: "What do you do that instantly melts my heart every single time? 🫣",
    a: ["laugh", "giggle", "smile", "excited"]
  },
  {
    q: "In this little Mario story, he keeps jumping levels just to reach one person. Who is she ❤️? 👑",
    a: ["bubba", "bubbachi", "drishya", "me"]
  }
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
        }
      }
    }

    requestAnimationFrame(animate);
  };

const handleAnswer = () => {
  const answer = input.toLowerCase().trim();

  const correct = riddles[index].a.some(keyword =>
    answer.includes(keyword)
  );

  if (correct) {
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
        <h1>🎉 Happy Birthday Bubbachiiiii😘 🎉</h1>
        <p>We solved soo many riddles on our own over the years and reached here </p>
        <p>Time to start solving things together now…</p>
        <p>Like how Mario found his princess, I found mine ❤️</p>
<div className="subtext">
  Thank you for being my forever Player 1 🎮💖 Mika Mikaa 🙈
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
          className="mario"
          style={{
            transform: `translate(${50 + x}px, ${-y}px) rotate(${finished ? -8 : 0}deg)`
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

            <button
              className="continue-btn"
              onClick={() => setShowBirthday(true)}
            >
              Continue ❤️
            </button>
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
