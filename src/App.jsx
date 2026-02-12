import { useState, useRef, useEffect } from "react";
import RoomOne from "./RoomOne";
import RoomTwo from "./RoomTwo";
// import RoomThree from "./RoomThree"; // later

function App() {
  const [room, setRoom] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0;

    const startMusic = () => {
      audio.play().catch(() => {});

      // 🎵 Smooth Fade In
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.02;
          audio.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 100);

      document.removeEventListener("click", startMusic);
    };

    document.addEventListener("click", startMusic);

    return () => {
      document.removeEventListener("click", startMusic);
    };
  }, []);

  return (
    <div className="app-container">
      {/* 🎵 Global Background Music */}
      <audio ref={audioRef}>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* 🎬 Room Routing */}
      {room === 1 && <RoomOne goNext={() => setRoom(2)} />}
      {room === 2 && <RoomTwo goNext={() => setRoom(3)} />}
      {/* {room === 3 && <RoomThree />} */}
    </div>
  );
}

export default App;
