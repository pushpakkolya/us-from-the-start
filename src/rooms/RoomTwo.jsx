import { useState, useEffect } from "react";
import "./RoomTwo.css";

import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";

export default function RoomTwo({ onComplete }) {
  const lines = [
    "Before today ends...",
    "I need you to see something.",
    "Not just pictures.",
    "But moments that changed everything.",
  ];

  const [visibleLines, setVisibleLines] = useState(0);
  const [showMemories, setShowMemories] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowMemories(true), 1000);
      setTimeout(() => setShowButton(true), 6000);
    }
  }, [visibleLines]);

  return (
    <div className="cinema-container">

      <div className="cinema-overlay"></div>

      <div className="intro-text">
        {lines.slice(0, visibleLines).map((line, index) => (
          <p key={index} className="cinema-line">
            {line}
          </p>
        ))}
      </div>

      {showMemories && (
        <div className="memory-sequence">

          <div className="memory-card">
            <img src={photo1} alt="" />
            <p>You didn’t even know… but this is when I started falling.</p>
          </div>

          <div className="memory-card">
            <img src={photo2} alt="" />
            <p>Your smile here? Yeah… it still wins.</p>
          </div>

          <div className="memory-card">
            <img src={photo3} alt="" />
            <p>This day felt different. Softer. Warmer.</p>
          </div>

          <div className="memory-card">
            <img src={photo4} alt="" />
            <p>And somehow… it only keeps getting better.</p>
          </div>

        </div>
      )}

      {showButton && (
        <button className="cinema-button" onClick={onComplete}>
          Continue ❤️
        </button>
      )}

    </div>
  );
}
