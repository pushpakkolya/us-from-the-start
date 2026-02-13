import React, { useState, useEffect } from "react";

const RIDDLE_POOL = [
  { question: "I have hands but cannot clap. What am I?", answer: "clock" },
  { question: "What gets wetter the more it dries?", answer: "towel" },
  { question: "What has a heart that doesn’t beat?", answer: "artichoke" },
  { question: "I speak without a mouth and hear without ears. What am I?", answer: "echo" },
  { question: "What has keys but can't open locks?", answer: "piano" },
  { question: "What has a face and two hands but no arms or legs?", answer: "clock" },
  { question: "What runs but never walks?", answer: "river" },
  { question: "What has an eye but cannot see?", answer: "needle" },
  { question: "What can travel around the world while staying in one corner?", answer: "stamp" },
  { question: "What has a neck but no head?", answer: "bottle" },
  { question: "What has to be broken before you can use it?", answer: "egg" },
  { question: "What month has 28 days?", answer: "all" },
  { question: "What begins with T, ends with T, and has T in it?", answer: "teapot" },
  { question: "What goes up but never comes down?", answer: "age" },
  { question: "What has legs but doesn’t walk?", answer: "table" },
  { question: "What gets bigger the more you take away?", answer: "hole" },
  { question: "What has a thumb and four fingers but is not alive?", answer: "glove" },
  { question: "What kind of band never plays music?", answer: "rubber band" },
  { question: "What is always in front of you but can’t be seen?", answer: "future" },
  { question: "What can you catch but not throw?", answer: "cold" }
];

export default function RoomFour({ onComplete }) {
  const [riddles, setRiddles] = useState([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [jump, setJump] = useState(false);

  useEffect(() => {
    const shuffled = [...RIDDLE_POOL].sort(() => 0.5 - Math.random());
    setRiddles(shuffled.slice(0, 5));
  }, []);

  const handleSubmit = () => {
    if (!riddles[current]) return;

    if (input.trim().toLowerCase() === riddles[current].answer) {
      setJump(true);
      setTimeout(() => setJump(false), 400);

      const newProgress = progress + 20;
      setProgress(newProgress);

      if (current === 4) {
        setTimeout(() => setCompleted(true), 600);
      } else {
        setCurrent(current + 1);
      }
      setInput("");
    } else {
      alert("Oops! Try again 💭");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* LEFT SIDE - GAME */}
      <div style={styles.gameSide}>
        <div style={styles.sky}>
          <div style={{ ...styles.mario, left: `${progress}%`, ...(jump ? styles.jump : {}) }} />
          <div style={styles.princess} />
        </div>

        {completed && (
          <div style={styles.finalOverlay}>
            <div style={styles.heart}>💖</div>
            <h2>Mario found his Princess 💕</h2>
            <button onClick={onComplete} style={styles.nextButton}>
              Continue ➡️
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - RIDDLES */}
      {!completed && (
        <div style={styles.riddleSide}>
          <h2>Help Mario reach his Princess 👑</h2>
          {riddles[current] && (
            <>
              <p style={styles.question}>{riddles[current].question}</p>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleSubmit} style={styles.submitButton}>
                Submit
              </button>
              <p>{current + 1} / 5</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "monospace",
    background: "#87CEEB"
  },
  gameSide: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(#87CEEB, #bde0ff)"
  },
  sky: {
    position: "relative",
    height: "100%"
  },
  mario: {
    position: "absolute",
    bottom: "40px",
    width: "40px",
    height: "40px",
    background: "red",
    borderRadius: "4px",
    transition: "left 0.6s ease"
  },
  princess: {
    position: "absolute",
    bottom: "40px",
    right: "40px",
    width: "40px",
    height: "40px",
    background: "pink",
    borderRadius: "4px"
  },
  jump: {
    transform: "translateY(-20px)"
  },
  riddleSide: {
    flex: 1,
    padding: "60px",
    background: "#fff8f0"
  },
  question: {
    fontSize: "18px",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    width: "80%",
    marginBottom: "15px"
  },
  submitButton: {
    padding: "10px 20px",
    cursor: "pointer"
  },
  finalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 1s ease"
  },
  heart: {
    fontSize: "50px",
    marginBottom: "20px"
  },
  nextButton: {
    marginTop: "20px",
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: "16px"
  }
};
