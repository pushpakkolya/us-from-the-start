import React, { useState, useEffect } from "react";
import "./RoomTwo.css";

import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";

const images = [
  {
    id: 1,
    src: photo1,
    short: "The Day I Realized.",
    long: "This was the day I knew something felt different. The way you laughed, the way you looked at me... it stayed with me longer than I expected."
  },
  {
    id: 2,
    src: photo2,
    short: "Your Soft Smile.",
    long: "Your smile is unfair. It fixes my worst days. It makes everything around you feel warmer."
  },
  {
    id: 3,
    src: photo3,
    short: "Our Chaos.",
    long: "We are chaotic, dramatic, ridiculous… but somehow perfect in our own way."
  },
  {
    id: 4,
    src: photo4,
    short: "That Moment.",
    long: "Time slowed down here. I didn’t want the moment to end."
  },
  {
    id: 5,
    src: photo5,
    short: "You Being You.",
    long: "The softest heart. The cutest soul. The most precious human."
  },
  {
    id: 6,
    src: photo6,
    short: "Still My Favorite.",
    long: "No matter how many days pass, you are still my favorite notification."
  }
];

export default function RoomTwo({ onComplete }) {
  const [activeImage, setActiveImage] = useState(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const lines = [
    "Before today ends...",
    "I need you to see something.",
    "Not just pictures.",
    "But moments that changed everything."
  ];

  // Cinematic line transition
  useEffect(() => {
    if (currentLine < lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowGallery(true), 2000);
    }
  }, [currentLine]);

  return (
    <div className={`room-two ${activeImage ? "blurred" : ""}`}>

      {!showGallery ? (
        <div className="cinematic-intro">
          <p key={currentLine} className="cinematic-text">
            {lines[currentLine]}
          </p>
        </div>
      ) : (
        <>
          <h1 className="gallery-title">A Little Piece of Us 🤍</h1>

          <div className="gallery-grid">
            {images.map((img) => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => setActiveImage(img)}
              >
                <img src={img.src} alt="" />
                <div className="overlay">
                  <p>{img.short}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="next-room-btn" onClick={onComplete}>
            Continue 🤍
          </button>
        </>
      )}

      {/* Modal */}
      {activeImage && (
        <div className="modal" onClick={() => setActiveImage(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={activeImage.src} alt="" />
            <h2>{activeImage.short}</h2>
            <p>{activeImage.long}</p>
            <button onClick={() => setActiveImage(null)}>
              Close 🤍
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
