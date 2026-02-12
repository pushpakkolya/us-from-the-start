import { useState, useRef, useEffect } from "react";
import Landing from "./components/Landing";
import RoomOne from "./rooms/RoomOne";
import bgMusic from "./assets/bg.mp3";

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  const audioRef = useRef(null);

  // Play music when user clicks "Yes"
  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.volume = 0.4; // softer background
      audioRef.current.play().catch(() => {
        // autoplay might be blocked silently
      });
    }
  }, [started]);

  const rooms = [
    RoomOne,
    // Add more rooms here later
  ];

  if (!started) {
    return (
      <div className="fade-container">
        <Landing onStart={() => setStarted(true)} />
        <audio ref={audioRef} src={bgMusic} loop />
      </div>
    );
  }

  const CurrentRoom = rooms[currentRoomIndex];

  if (!CurrentRoom) {
    return (
      <div className="fade-container" style={{ textAlign: "center", padding: "40px" }}>
        <h1>All Rooms Completed 🎉</h1>
        <p>You unlocked everything ❤️</p>
        <audio ref={audioRef} src={bgMusic} loop />
      </div>
    );
  }

  return (
    <div key={currentRoomIndex} className="fade-container">
      <CurrentRoom
        onComplete={() =>
          setCurrentRoomIndex((prev) => prev + 1)
        }
      />
      <audio ref={audioRef} src={bgMusic} loop />
    </div>
  );
}
