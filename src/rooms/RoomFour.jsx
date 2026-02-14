import { useState, useEffect, useRef } from "react";
import "./RoomFour.css";

import marioStand from "../assets/mario/mario-stand.png";
import marioJump from "../assets/mario/mario-jump.png";
import princessImg from "../assets/mario/princess.png";
import castleImg from "../assets/mario/castle.png";
import cloudImg from "../assets/mario/cloud.png";
import coinImg from "../assets/mario/coin.png";

import jumpSoundFile from "../assets/sounds/jump.mp3";
import coinSoundFile from "../assets/sounds/coin.mp3";

const riddlesPool = [
  { q: "What has hands but can’t clap?", a: "clock" },
  { q: "What gets wetter the more it dries?", a: "towel" },
  { q: "What has keys but can't open locks?", a: "piano" },
  { q: "What has a heart that doesn’t beat?", a: "artichoke" },
  { q: "What has to be broken before you use it?", a: "egg" },
  { q: "What runs but never walks?", a: "water" },
  { q: "What has one eye but cannot see?", a: "needle" },
];

function getRandomRiddles() {
  return riddlesPool.sort(() => 0.5 - Math.random()).slice(0, 5);
}

export default function RoomFour() {
  const [riddles] = useState(getRandomRiddles());
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);

  const [isJumping, setIsJumping] = useState(false);
  const [showCoin, setShowCoin] = useState(false);

  const [kissScene, setKissScene] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [birthdayReveal, setBirthdayReveal] = useState(false);

  const jumpSound = useRef(new Audio(jumpSoundFile));
  const coinSound = useRef(new Audio(coinSoundFile));

  const TOTAL_DISTANCE = 1100;
  const STEP_DISTANCE = TOTAL_DISTANCE / 5;

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === riddles[index].a) {

      // 🔊 Play sounds
      jumpSound.current.currentTime = 0;
      coinSound.current.currentTime = 0;
      jumpSound.current.play();
      coinSound.current.play();

      // Trigger jump sprite
      setIsJumping(true);
      setShowCoin(true);

      setTimeout(() => setIsJumping(false), 500);
      setTimeout(() => setShowCoin(false), 800);

      setCorrectCount(prev => prev + 1);
      setAnswer("");

      if (correctCount < 4) {
        setIndex(prev => prev + 1);
      }
    }
  };

  /* ✅ Guaranteed Final Sequence */
  useEffect(() => {
    if (correctCount === 5) {
      setTimeout(() => setKissScene(true), 700);
      setTimeout(() => setCelebration(true), 1200);
      setTimeout(() => setBirthdayReveal(true), 4500);
    }
  }, [correctCount]);

  return (
    <div className="room-four">
      <div className="game-world">

        <img src={cloudImg} className="cloud cloud1" alt="" />
        <img src={cloudImg} className="cloud cloud2" alt="" />
        <img src={castleImg} className="castle" alt="" />

        <img
          src={princessImg}
          alt=""
          className={`princess ${correctCount === 5 ? "princess-final" : ""} ${kissScene ? "kiss" : ""}`}
        />

        <img
          src={isJumping ? marioJump : marioStand}
          alt=""
          className={`mario 
            ${correctCount === 5 ? "mario-final" : ""} 
            ${isJumping ? "jump-motion" : ""} 
            ${kissScene ? "kiss" : ""}`}
          style={
            correctCount < 5
              ? { transform: `translateX(${correctCount * STEP_DISTANCE}px)` }
              : {}
          }
        />

        {showCoin && (
          <img
            src={coinImg}
            alt=""
            className="coin"
            style={{
              left: 50 + correctCount * STEP_DISTANCE + 20
            }}
          />
        )}

        {kissScene && <div className="center-heart">💖</div>}

        {celebration && (
          <div className="fireworks">
            <div className="firework fw1"></div>
            <div className="firework fw2"></div>
            <div className="firework fw3"></div>
          </div>
        )}

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
