import React, { useEffect, useState } from "react";
import "./RoomFour.css";

const RIDDLE_POOL = [
  { q: "I have hands but cannot clap. What am I?", a: "clock" },
  { q: "What gets wetter the more it dries?", a: "towel" },
  { q: "I speak without a mouth and hear without ears. What am I?", a: "echo" },
  { q: "What has a heart that doesn’t beat?", a: "artichoke" },
  { q: "What has keys but can’t open locks?", a: "piano" },
  { q: "What runs but never walks?", a: "water" },
  { q: "What has a face and two hands but no arms or legs?", a: "clock" },
  { q: "What has one eye but can’t see?", a: "needle" },
  { q: "What is always in front of you but can’t be seen?", a: "future" },
  { q: "What has a neck but no head?", a: "bottle" },
  { q: "What has legs but doesn’t walk?", a: "table" },
  { q: "What has a ring but no finger?", a: "phone" },
  { q: "What can travel around the world while staying in a corner?", a: "stamp" },
  { q: "What has a thumb and four fingers but isn’t alive?", a: "glove" },
  { q: "What has teeth but can’t bite?", a: "comb" },
  { q: "What has a bottom at the top?", a: "leg" },
  { q: "What begins with T, ends with T, and has T in it?", a: "teapot" },
  { q: "What can you catch but not throw?", a: "cold" },
  { q: "What is full of holes but still holds water?", a: "sponge" },
  { q: "What goes up but never comes down?", a: "age" },
];

export default function RoomFour({ goToRoom }) {
  const [riddles, setRiddles] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showDevInput, setShowDevInput] = useState(false);
  const [devCode, setDevCode] = useState("");

  useEffect(() => {
    const shuffled = [...RIDDLE_POOL].sort(() => 0.5 - Math.random());
    setRiddles(shuffled.slice(0, 5));
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.shiftKey && e.key === "D") {
        setShowDevInput((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const submitAnswer = () => {
    if (answer.trim().toLowerCase() === riddles[index].a) {
      const newProgress = progress + 20;
      setProgress(newProgress);
      setAnswer("");

      if (index === 4) {
        setCompleted(true);
      } else {
        setIndex(index + 1);
      }
    } else {
      alert("Oops! Try again 💭");
    }
  };

  const handleDevSubmit = () => {
    if (devCode === "room1") goToRoom(1);
    if (devCode === "room2") goToRoom(2);
    if (devCode === "room3") goToRoom(3);
    if (devCode === "room4") goToRoom(4);
  };

  return (
    <div className="room-four">
      <div className="game-area">
        <div className="platform"></div>

        <div
          className={`mario ${completed ? "kiss" : ""}`}
          style={{ left: `${progress}%` }}
        ></div>

        <div className={`princess ${completed ? "reached" : ""}`}></div>

        {completed && (
          <div className="final-message">
            Mario found his Princess 💖
          </div>
        )}
      </div>

      {!completed && riddles.length > 0 && (
        <div className="riddle-panel">
          <h2>{riddles[index].q}</h2>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer..."
          />
          <button onClick={submitAnswer}>Submit</button>
          <p>Progress: {progress}%</p>
        </div>
      )}

      {showDevInput && (
        <div className="dev-console">
          <input
            value={devCode}
            onChange={(e) => setDevCode(e.target.value)}
            placeholder="room1 / room2..."
          />
          <button onClick={handleDevSubmit}>Go</button>
        </div>
      )}
    </div>
  );
}
