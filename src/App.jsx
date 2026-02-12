import { useState } from "react";
import Landing from "./rooms/Landing";
import RoomOne from "./rooms/RoomOne";
import RoomTwo from "./rooms/RoomTwo";

function App() {
  const [room, setRoom] = useState(0);

  return (
    <>
      {room === 0 && <Landing onStart={() => setRoom(1)} />}
      {room === 1 && <RoomOne onComplete={() => setRoom(2)} />}
      {room === 2 && <RoomTwo onComplete={() => setRoom(3)} />}
    </>
  );
}

export default App;
