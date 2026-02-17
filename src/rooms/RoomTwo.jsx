import { useState, useEffect } from "react";
import "./RoomTwo.css";

import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";

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
      setTimeout(() => setShowMemories(true), 1200);
      setTimeout(() => setShowButton(true), 8000);
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

          <div className="memory-card delay1">
            <img src={photo1} alt="" />
            <p>This is when I started noticing you differently.</p>
          </div>

          <div className="memory-card delay2">
            <img src={photo2} alt="" />
            <p>Your smile here? Yeah… it still wins.</p>
          </div>

          <div className="memory-card delay3">
            <img src={photo3} alt="" />
            <p>This day felt softer. Warmer. Safer.</p>
          </div>

          <div className="memory-card delay4">
            <img src={photo4} alt="" />
            <p>I replay this moment more than you think.</p>
          </div>

          <div className="memory-card delay5">
            <img src={photo5} alt="" />
            <p>You make everything feel lighter.</p>
          </div>

          <div className="memory-card delay6">
            <img src={photo6} alt="" />
            <p>And somehow… you just keep getting better.</p>
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
 
