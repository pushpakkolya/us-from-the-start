import { useState } from "react";
import "./RoomFour.css";

import marioImg from "../assets/mario/mario-stand.png";
import princessImg from "../assets/mario/princess.png";
import castleImg from "../assets/mario/castle.png";
import cloudImg from "../assets/mario/cloud.png";

const riddlesPool = [
  { q: "What has hands but can’t clap?", a: "clock" },
  { q: "What gets wetter the more it dries?", a: "towel" },
  { q: "What has keys but can't open locks?", a: "piano" },
  { q: "What has a heart that doesn’t beat?", a: "artichoke" },
  { q: "What has to be broken before you use it?", a: "egg" },
  { q: "What runs but never walks?", a: "water" },
  { q: "What has one eye but cannot see?", a: "needle" },
  { q: "What goes up but never comes down?", a: "age" },
];

function getRandomRiddles() {
  return riddlesPool.sort(() => 0.5 - Math.random()).slice(0, 5);
}

export default function RoomFour() {
  const [riddles] = useState(getRandomRiddles());
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [kissScene, setKissScene] = useState(false);
  const [birthdayReveal, setBirthdayReveal] = useState(false);

  const TOTAL_DISTANCE = 700; // total px mario travels
  const STEP_DISTANCE = TOTAL_DISTANCE / 5;

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === riddles[index].a) {
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      setAnswer("");

      if (newCount < 5) {
        setIndex(index + 1);
      }

      if (newCount === 5) {
        // trigger kiss after movement animation finishes
        setTimeout(() => {
          setKissScene(true);
        }, 900);

        // birthday reveal
        setTimeout(() => {
          setBirthdayReveal(true);
        }, 3000);
      }
    }
  };

  return (
    <div className="room-four">
      <div className="game-world">

        <img src={cloudImg} className="cloud cloud1" alt="" />
        <img src={cloudImg} className="cloud cloud2" alt="" />

        <img src={castleImg} className="castle" alt="" />

        {/* Princess always visible */}
        <img
          src={princessImg}
          className={`princess ${kissScene ? "kiss" : ""}`}
          alt=""
        />

        {/* Mario */}
        <img
          src={marioImg}
          className={`mario ${kissScene ? "kiss" : ""}`}
          alt=""
          style={{
            transform: `translateX(${correctCount * STEP_DISTANCE}px)`
          }}
        />
      </div>

      {correctCount < 5 && (
        <div className="riddle-box">
          <h3>{riddles[index].q}</h3>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer..."
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {kissScene && (
        <div className="kiss-overlay">
          <div className="heart-burst">💖</div>
        </div>
      )}

      {birthdayReveal && (
        <div className="birthday-screen">
          <h1>🎉 HAPPY BIRTHDAY MY PRINCESS 🎉</h1>
          <p>March 9th — The Day My World Leveled Up ❤️</p>
          <p className="subtext">You are my forever Player Two.</p>
        </div>
      )}
    </div>
  );
}
