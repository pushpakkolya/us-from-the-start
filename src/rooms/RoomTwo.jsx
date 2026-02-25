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
    }, 2200);
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
long: "Never stop laughing your heart out..."
},
{
src: photo3,
short: "That Drama 💕",
long: "Your drama isn’t loud..."
},
{
src: photo6,
short: "The chaos ✨",
long: "The sudden energy bursts..."
},
{
src: photo5,
short: "Yeah, She is that pretty 😌",
long: "The prettiest..."
},
{
src: photo2,
short: "Us being us 🥹",
long: "No filters. No pretending..."
},
{
src: photo1,
short: "Still my favorite 💖",
long: "If I could relive one frame forever..."
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

<div className={`room-two-container ${selectedImage !== null ? "modal-open" : ""}`}>

{/* Ambient Light */}
<div className="vignette"></div>

{/* Dream Particles */}
<div className="dream-particles">
{[...Array(18)].map((_, i) => (
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

<div className="image-wrapper">

<img
src={img.src}
alt=""
className="gallery-image"
/>

<div className="image-shimmer"></div>

</div>

<p className="short-text">
{img.short}
</p>

</div>

))}

</div>

{openedCount === 6 && (
<div className="epic-message">
✨ You unlocked every memory ✨
</div>
)}

</div>

{/* Modal */}

{selectedImage !== null && (

<div className="modal-overlay" onClick={closeModal}>

<div
className="modal-content"
onClick={(e) => e.stopPropagation()}
>

<button
className="close-btn"
onClick={closeModal}
>
✕
</button>

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
