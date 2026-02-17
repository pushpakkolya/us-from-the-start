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
    "But moments that changed everything."
  ];

  const [visibleLines, setVisibleLines] = useState(0);
  const [showMemories, setShowMemories] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowMemories(true), 1200);
      setTimeout(() => setShowButton(true), 9000);
    }
  }, [visibleLines]);

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const memories = [
    {
      img: photo1,
      short: "This is when I started noticing you differently.",
      long: "I don't think you even realized how much you changed something in me that day. The way you looked, the way you laughed… it stayed with me longer than I expected. And somehow, everything after that felt different."
    },
    {
      img: photo2,
      short: "Your smile here? Yeah… it still wins.",
      long: "That smile has this quiet power. It makes everything feel lighter. Even on days you don't feel your best, you still manage to light up every space you're in."
    },
    {
      img: photo3,
      short: "This day felt softer. Warmer. Safer.",
      long: "There was something about this moment that just felt calm. Like the world slowed down a little. And I remember thinking… if life feels like this with you, I'm okay."
    },
    {
      img: photo4,
      short: "I replay this moment more than you think.",
      long: "Not because it's perfect. But because it’s real. And I love the real moments with you more than anything polished or planned."
    },
    {
      img: photo5,
      short: "You make everything feel lighter.",
      long: "Even when life gets overwhelming, being around you shifts something. You make ordinary days feel special without even trying."
    },
    {
      img: photo6,
      short: "And somehow… you just keep getting better.",
      long: "I didn’t think it was possible to admire someone more over time. But here we are. Every year, every memory, every laugh… you just keep surprising me."
    }
  ];

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
          {memories.map((memory, index) => (
            <div
              key={index}
              className={`memory-card ${activeCard === index ? "active" : ""}`}
              onClick={() => toggleCard(index)}
            >
              <img src={memory.img} alt="" />
              <p className="short-text">{memory.short}</p>

              {activeCard === index && (
                <div className="long-text">
                  <p>{memory.long}</p>
                </div>
              )}
            </div>
          ))}
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
