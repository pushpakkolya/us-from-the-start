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
      short: "The chaos ✨",
      long: "The sudden energy bursts that you have; cutest and the most satisfying chaos ever. One minute you are a couch potato and the next second you are a monkey on a tree and honestly I cannot imagine my life without your mayhem now 💞. "
    },
    {
      src: photo5,
      short: "Yeah, She is that pretty 😌",
         long: "The prettiest. I love every inch of youu, inside out and I cant stop flexing youu. You are the prettiest when you smile. And you manage to be ridiculously cute at the same time 🥱. I dont want to admit it but I hope your genes wins and we get cute babies like youu 🫣"
       },
    {
      src: photo2,
      short: "Us being us 🥹",
      long: "No filters. No pretending. Just comfort. Just being ourselves, without trying to be anything more or less. Random plans that weren’t planned 🚗. Fun adventures that started with a simple “let’s go?” . Taking turns we didn’t expect, changing routes halfway, and still ending up exactly where we were meant to be 💞. Somehow, with you, even the simplest things feel exciting. I somehow have all the energy in the world to do anything with you 🫣"
    },
    {
      src: photo1,
      short: "Still my favorite 💖",
      long: "I used to think home was a place you go back to. But somewhere along the way, I realized it’s actually a person you feel safe with. No matter where life takes me, or how far I wander, somehow it always feels like I’m home when I’m with you 💞and I’m exactly where I belong."
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
      <p key={i + "-" + lineIndex} className="intro-line">{line}</p>
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

{/* Epic unlock message - show only after ALL images opened */}
{openedCount === images.length && (
  <div className="epic-message-container">
    
    <div className="epic-message">
      ✨ You unlocked the final memory…
    </div>

    <button
      className="next-room-btn"
      onClick={onComplete}
    >
      Enter the next room 🤍 →
    </button>

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
