import { useState } from "react";
import "./RoomFour.css";

const riddlesPool = [
  { q: "What has hands but can’t clap?", a: "clock" },
  { q: "What has a face and two hands, but no arms or legs?", a: "clock" },
  { q: "What gets wetter the more it dries?", a: "towel" },
  { q: "What has keys but can't open locks?", a: "piano" },
  { q: "What has a heart that doesn’t beat?", a: "artichoke" },
  { q: "What has to be broken before you use it?", a: "egg" },
  { q: "What has one eye but cannot see?", a: "needle" },
  { q: "What has legs but doesn’t walk?", a: "table" },
  { q: "What can travel around the world while staying in a corner?", a: "stamp" },
  { q: "What has a ring but no finger?", a: "phone" },
  { q: "What comes once in a minute, twice in a moment?", a: "m" },
  { q: "What has many teeth but can’t bite?", a: "comb" },
  { q: "What runs but never walks?", a: "water" },
  { q: "What has a neck but no head?", a: "bottle" },
  { q: "What has an eye but can’t see?", a: "needle" },
  { q: "What has four legs in the morning, two at noon, three at night?", a: "human" },
  { q: "What goes up but never comes down?", a: "age" },
  { q: "What is always in front of you but can’t be seen?", a: "future" },
  { q: "What has a thumb and four fingers but isn’t alive?", a: "glove" },
  { q: "What begins with T, ends with T, and has T in it?", a: "teapot" },
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

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === riddles[index].a) {
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      setAnswer("");

      if (newCount < 5) {
        setIndex(index + 1);
      }

      if (newCount === 5) {
        setTimeout(() => {
          setKissScene(true);
        }, 1200);

        setTimeout(() => {
          setBirthdayReveal(true);
        }, 3500);
      }
    }
  };

  return (
    <div className="room-four">

      {/* GAME WORLD */}
      <div className="game-world">

        {/* Clouds */}
        <img src="/mario/cloud.png" className="cloud cloud1" />
        <img src="/mario/cloud.png" className="cloud cloud2" />

        {/* Castle */}
        <img src="/mario/castle.png" className="castle" />

        {/* Princess */}
        {correctCount === 5 && (
          <img src="/mario/princess.png" className="princess" />
        )}

        {/* Mario */}
        <img
          src="/mario/mario-stand.png"
          className={`mario ${correctCount === 5 ? "mario-final" : ""}`}
          style={{
            transform: `translateX(${correctCount * 140}px)`
          }}
        />
      </div>

      {/* Riddle Section */}
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

      {/* Kiss Scene */}
      {kissScene && (
        <div className="kiss-overlay">
          <div className="heart-burst">💖💖💖</div>
        </div>
      )}

      {/* GRAND BIRTHDAY REVEAL */}
      {birthdayReveal && (
        <div className="birthday-screen">
          <h1>🎉 HAPPY BIRTHDAY MY PRINCESS 🎉</h1>
          <p>March 9th — The Day My World Leveled Up ❤️</p>
          <p className="subtext">
            You are my forever Player Two.
          </p>
        </div>
      )}

    </div>
  );
}
