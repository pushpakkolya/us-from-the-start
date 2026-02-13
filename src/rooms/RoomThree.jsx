import { useEffect, useState } from "react";
import puzzleImage from "../assets/puzzle.jpg";

export default function RoomThree({ onComplete }) {
  const size = 4;
  const tileSize = 120; // bigger tiles
  const total = size * size;

  const solved = [...Array(total - 1).keys()]
    .map(i => i + 1)
    .concat(null);

  // 🧠 Always solvable shuffle
  const shuffleSolvable = () => {
    let arr;
    do {
      arr = [...solved];
      for (let i = arr.length - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    } while (!isSolvable(arr));
    return arr;
  };

  const isSolvable = (arr) => {
    const nums = arr.filter(n => n !== null);
    let inversions = 0;

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] > nums[j]) inversions++;
      }
    }

    return inversions % 2 === 0;
  };

  const [tiles, setTiles] = useState(shuffleSolvable());
  const [completed, setCompleted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [reveal, setReveal] = useState(false);

  const getRowCol = (i) => [
    Math.floor(i / size),
    i % size
  ];

  const canMove = (i) => {
    const empty = tiles.indexOf(null);
    const [r1, c1] = getRowCol(i);
    const [r2, c2] = getRowCol(empty);
    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
  };

  const moveTile = (i) => {
    if (!canMove(i) || completed) return;

    const empty = tiles.indexOf(null);
    const newTiles = [...tiles];
    [newTiles[i], newTiles[empty]] =
      [newTiles[empty], newTiles[i]];

    setTiles(newTiles);
    setMoves(m => m + 1);
  };

  useEffect(() => {
    if (JSON.stringify(tiles) === JSON.stringify(solved)) {
      setCompleted(true);

      // soft snap reveal
      setTimeout(() => {
        setReveal(true);
      }, 400);

      // move to next room
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3000);
    }
  }, [tiles]);

  const isCorrectPosition = (tile, index) =>
    tile === solved[index];

  return (
    <div style={styles.container}>
      <h2>🧩 Complete the Picture</h2>
      <p>Moves: {moves}</p>

      <div
        style={{
          ...styles.grid,
          width: size * tileSize,
          height: size * tileSize,
          opacity: reveal ? 0 : 1,
          transition: "opacity 1.2s ease",
        }}
      >
{tiles.map((tile, index) => {
  if (tile === null) {
    return (
      <div
        key={index}
        style={{
          width: tileSize,
          height: tileSize,
        }}
      />
    );
  }

  const correctIndex = tile - 1;
  const x = correctIndex % size;
  const y = Math.floor(correctIndex / size);
  const correct = tile === solved[index];

  return (
    <div
      key={index}
      onClick={() => moveTile(index)}
      style={{
        width: tileSize,
        height: tileSize,
        backgroundImage: `url(${puzzleImage})`,
        backgroundSize: `${size * tileSize}px ${size * tileSize}px`,
        backgroundPosition: `-${x * tileSize}px -${y * tileSize}px`,
        backgroundRepeat: "no-repeat",
        cursor: canMove(index) ? "pointer" : "default",
        borderRadius: "8px",
        transition: "all 0.3s ease",
        boxShadow: correct
          ? "0 0 15px rgba(255, 182, 193, 0.7)"
          : "none",
      }}
    />
  );
})}

      </div>

      {/* 🌫 Full image reveal */}
      {reveal && (
        <div style={styles.revealOverlay}>
          <img
            src={puzzleImage}
            alt="Complete"
            style={{
              width: size * tileSize,
              height: size * tileSize,
              objectFit: "cover",
              borderRadius: "12px",
              animation: "snap 0.6s ease",
            }}
          />
        </div>
      )}

      {/* 🎉 Confetti */}
      {completed && <Confetti />}
    </div>
  );
}

function Confetti() {
  return (
    <div style={styles.confettiContainer}>
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          style={{
            ...styles.confetti,
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() + "s",
          }}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a0033, #2b0036)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "sans-serif",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 120px)",
    gridTemplateRows: "repeat(4, 120px)",
    gap: "6px",
    marginTop: "20px",
  },
  revealOverlay: {
    position: "absolute",
    animation: "fadeIn 1s ease",
  },
  confettiContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  confetti: {
    position: "absolute",
    width: "8px",
    height: "12px",
    background: "pink",
    top: "-20px",
    animation: "fall 3s linear infinite",
  },
};
