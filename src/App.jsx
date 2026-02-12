import { useState } from "react";
import RoomOne from "./rooms/RoomOne";
import RoomTwo from "./rooms/RoomTwo";

function App() {
  const [room, setRoom] = useState(1);

  return (
    <>
      {room === 1 && <RoomOne onComplete={() => setRoom(2)} />}
      {room === 2 && <RoomTwo onComplete={() => setRoom(3)} />}
    </>
  );
}

export default App;
