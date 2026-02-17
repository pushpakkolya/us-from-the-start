import React, { useState } from "react";
import "./RoomTwo.css";

import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";;


const images = [
  {
    id: 1,
    src: photo1 ,
    short: "The Day I Realized.",
    long: "This was the day I knew something felt different. The way you laughed, the way you looked at me... it stayed with me longer than I expected."
  },
  {
    id: 2,
    src: photo1 ,
    short: "Your Soft Smile.",
    long: "Your smile is unfair. It fixes my worst days. It makes everything around you feel warmer."
  },
  {
    id: 3,
    src: photo1 ,
    short: "Our Chaos.",
    long: "We are chaotic, dramatic, ridiculous… but somehow perfect in our own way."
  },
  {
    id: 4,
    src: photo1 ,
    short: "That Moment.",
    long: "Time slowed down here. I didn’t want the moment to end."
  },
  {
    id: 5,
    src: photo1 ,
    short: "You Being You.",
    long: "The softest heart. The cutest soul. The most precious human."
  },
  {
    id: 6,
    src: photo1 ,
    short: "Still My Favorite.",
    long: "No matter how many days pass, you are still my favorite notification."
  }
];

export default function RoomTwo() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className={`room-two ${activeImage ? "blurred" : ""}`}>
      
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

      {/* Modal */}
      {activeImage && (
        <div className="modal">
          <div className="modal-content">
            <img src={activeImage.src} alt="" />
            <h2>{activeImage.short}</h2>
            <p>{activeImage.long}</p>
            <button onClick={() => setActiveImage(null)}>Close 🤍</button>
          </div>
        </div>
      )}
    </div>
  );
}
