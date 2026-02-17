import { useState, useEffect } from "react";
import "./RoomTwo.css";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";

export default function RoomTwo({ onComplete }) {

/* -------------------------
   Cinematic Intro State
------------------------- */
const [showIntro, setShowIntro] = useState(true);
const [lineIndex, setLineIndex] = useState(0);

const introLines = [
  "Hiiii Bubbachii 🥰.. There is something i have been cooking over the last few days for youu 🤪 ",
  "I bareley held it together without telling you for this long",
  "I just wanted to make something that feels even a tiny bit as special as you make me feel every single day.",
  "But more than the surprise itself, I just want you to know how grateful I am for you.",
  "ilaaaavuuuuuuu bubbaa 💞.. Sooo sooo Muchhh. Hope you enjoy this."
];

useEffect(() => {
  if (lineIndex < introLines.length - 1) {
    const timer = setTimeout(() => {
      setLineIndex(prev => prev + 1);
    }, 2200); // slower now
    return () => clearTimeout(timer);
  }
}, [lineIndex]);


  /* -------------------------
     Gallery State
  ------------------------- */
  const [selectedImage, setSelectedImage] = useState(null);
  const [openedImages, setOpenedImages] = useState([]);
  const [openedCount, setOpenedCount] = useState(0);

  const images = [
    {
      src: photo4,
      short: "The endless laughters 🌸",
      long: "Never stop laughing your heart out (Except when you are driving 🙈). I absolutely love it when explode in laughter over anything. No matter how bad my mood is or how drained I am, seeing your 28 🦷 (27+1🫣 ) makes me feel 100 times better"
    },
    {
      src: photo3,
      short: "That Drama 💕",
      long: "Your drama isn’t loud. It’s silent, no Chaos but Dangerous😌. Paapa Meeee 🥲. The way you just go quiet and suddenly I’m questioning every decision I’ve made since 1996 😭. No shouting. No chaos. Just that calm “I’m fine. And somehow that’s 10x more powerful. But honestly? Even your silent treatment is cute. Because behind that subtle queen energy is the softest heart… and I love every version of you 💞 "
    },
    {
      src: photo6,
      short: "Our chaos ✨",
      long: "Not perfect. Not planned. But perfectly ours."
    },
    {
      src: photo5,
      short: "That day 🌙",
      long: "Time felt slower. Lighter. Safer."
    },
    {
      src: photo2,
      short: "Us being us 🥹",
      long: "No filters. No pretending. Just comfort."
    },
    {
      src: photo1,
      short: "Still my favorite 💖",
      long: "If I could relive one frame forever, it might be this one."
    }
  ];

  const handleImageClick = (index) => {
    if (!openedImages.includes(index)) {
      setOpenedImages(prev => [...prev, index]);
      setOpenedCount(prev => prev + 1);
    }
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="room-two-container">

      {/* Dreamy floating particles */}
      <div className="dream-particles">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="particle"></span>
        ))}
      </div>

      {/* Cinematic Intro */}
{showIntro && (
  <div className="cinematic-intro">
    {introLines.slice(0, lineIndex + 1).map((line, i) => (
      <p key={i} className="intro-line">{line}</p>
    ))}

    {lineIndex === introLines.length - 1 && (
      <button
        className="intro-continue-btn"
        onClick={() => setShowIntro(false)}
      >
        Continue 🤍
      </button>
    )}
  </div>
)}


      {/* Gallery */}
      <div className={`gallery-wrapper ${showIntro ? "hidden" : "visible"}`}>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={img.src}
                alt=""
                className="gallery-image"
              />
              <p className="short-text">{img.short}</p>
            </div>
          ))}
        </div>

        {/* Epic unlock message */}
        {openedCount === 6 && (
          <div className="epic-message">
            ✨ You just unlocked something special…
          </div>
        )}

      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedImage].src}
              alt=""
              className="modal-image"
            />
            <p className="long-text">
              {images[selectedImage].long}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
