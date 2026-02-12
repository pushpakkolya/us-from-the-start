import { useState, useEffect } from "react";

export default function RoomTwo({ onComplete }) {
  const lines = [
//    "Close your eyes for a second...",
//    "Go back to the very beginning.",
//    "Before everything.",
//    "Before the jokes.",
//    "Before the memories.",
//    "There was just… us.",
//    "Two people who had no idea what was coming.",
    "And yet… somehow it felt right."
  ];

  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShowButton(true);
    }
  }, [visibleLines]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "serif",
        textAlign: "center",
        padding: "40px"
      }}
    >
      {lines.slice(0, visibleLines).map((line, index) => (
        <p
          key={index}
          style={{
            opacity: 0,
            animation: "fadeInText 1s forwards",
            marginBottom: "15px"
          }}
        >
          {line}
        </p>
      ))}

      {showButton && (
        <button
          onClick={onComplete}
          style={{
            marginTop: "30px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Continue ❤️
        </button>
      )}
    </div>
  );
}
