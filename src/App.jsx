import { useState } from "react";
import Landing from "./components/Landing";
import RoomOne from "./rooms/RoomOne";

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  const rooms = [
    RoomOne,
  ];

if (!started) {
  return (
    <div className="fade-container">
      <Landing onStart={() => setStarted(true)} />
    </div>
  );
}


  const CurrentRoom = rooms[currentRoomIndex];

  if (!CurrentRoom) {
    return (
      <div
        style={{
          padding: "40px",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        <h1>All Rooms Completed 🎉</h1>
        <p>You unlocked everything ❤️</p>
      </div>
    );
  }

return (
  <div key={currentRoomIndex} className="fade-container">
    <CurrentRoom
      onComplete={() => setCurrentRoomIndex((prev) => prev + 1)}
    />
  </div>
);

  );
}
