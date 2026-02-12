import { useState } from "react";
import Landing from "./components/Landing";
import RoomOne from "./rooms/RoomOne";

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(0);

  if (!started) {
    return <Landing onStart={() => setStarted(true)} />;
  }

  if (currentRoom === 0) {
    return <RoomOne onComplete={() => setCurrentRoom(1)} />;
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h1>Room Completed 🎉</h1>
      <p>More coming soon...</p>
    </div>
  );
}
