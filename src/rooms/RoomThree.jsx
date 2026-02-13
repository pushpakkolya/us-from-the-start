import { useEffect, useState } from "react";
import puzzleImage from "../assets/puzzle.jpg";

export default function RoomThree({ onComplete }) {
  const size = 3;
  const tileSize = 160;
  const total = size * size;

  const solved = [...Array(total - 1).keys()]
    .map(i => i + 1)
    .concat(null);

  const shuffleSolvable = () => {
    let arr = [...solved];
    let emptyIndex = arr.indexOf(null);

    for (let i = 0; i < 15; i++) {
      const possibleMoves = [];
      const row = Math.floor(emptyIndex / size);
      const col = emptyIndex % size;

      if (row > 0) possibleMoves.push(emptyIndex - size);
      if (row < size - 1) possibleMoves.push(emptyIndex + size);
      if (col > 0) possibleMoves.push(emptyIndex - 1);
      if (col < size - 1) possibleMoves.push(emptyIndex + 1);

      const moveIndex =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

      [arr[emptyIndex], arr[moveIndex]] =
        [arr[moveIndex], arr[emptyIndex]];

      emptyIndex = moveIndex;
    }

    return arr;
  };

  const [tiles, setTiles] = useState(shuffleSolvable());
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [magicAvailable, setMagicAvailable] = useState(false);
  const [magicMode, setMagicMode] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

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
    if (!canMove(i) || completed || magicMode) return;

    const empty = tiles.indexOf(null);
    const newTiles = [...tiles];
    [newTiles[i], newTiles[empty]] =
      [newTiles[empty], newTiles[i]];

    setTiles(newTiles);
    setMoves(m => m + 1);
  };

  useEffect(() => {
    if (moves > 0 && moves % 50 === 0) {
      setMagicAvailable(true);
    }
  }, [moves]);

  useEffect(() => {
    if (JSON.stringify(tiles) === JSON.stringify(solved)) {
      setCompleted(true);

      setTimeout(() => {
        if (onComplete) onComplete();
      }, 5000);
    }
  }, [tiles]);

  const isCorrect = (tile, index) =>
    tile === solved[index];

  return (
    <div style={styles.container}>
      <h2>🧩 Complete the Picture</h2>
      <p>Moves: {moves}</p>

      {magicAvailable && !magicMode && !completed && (
        <button
          onClick={() => setMagicMode(true)}
          style={styles.magicButton}
        >
          ✨ Magic Swap Available
        </button>
      )}

      {!completed && (
        <div
          style={{
            ...styles.grid,
            width: size * tileSize,
            height: size * tileSize,
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
            const row = Math.floor(correctIndex / size);
            const col = correctIndex % size;

            const correct = isCorrect(tile, index);

            return (
              <div
                key={index}
                draggable={magicMode}
                onDragStart={() =>
                  magicMode && setDragIndex(index)
                }
                onDragOver={(e) =>
                  magicMode && e.preventDefault()
                }
                onDrop={() => {
                  if (!magicMode || dragIndex === null) return;

                  const newTiles = [...tiles];
                  [newTiles[dragIndex], newTiles[index]] =
                    [newTiles[index], newTiles[dragIndex]];

                  setTiles(newTiles);
                  setMagicMode(false);
                  setMagicAvailable(false);
                  setDragIndex(null);
                }}
                onClick={() => moveTile(index)}
                style={{
                  width: tileSize,
                  height: tileSize,
                  backgroundImage: `url(${puzzleImage})`,
                  backgroundSize: `${size * tileSize}px ${size * tileSize}px`,
                  backgroundPosition: `-${col * tileSize}px -${row * tileSize}px`,
                  backgroundRepeat: "no-repeat",
                  borderRadius: "12px",
                  cursor: magicMode
                    ? "grab"
                    : canMove(index)
                    ? "pointer"
                    : "default",
                  transition: "all 0.3s ease",
                  boxShadow: correct
                    ? "0 0 25px hotpink"
                    : "none",
                }}
              />
            );
          })}
        </div>
      )}

      {completed && (
        <div style={styles.revealWrapper}>
          <GlowAura />
          <img
            src={puzzleImage}
            alt="Completed"
            style={styles.finalImage}
          />
          <h1 style={styles.overlayText}>You Did It 💖</h1>
          <SparkleBurst />
          <Confetti />
        </div>
      )}
    </div>
  );
}

/* ✨ Glow Aura */
function GlowAura() {
  return <div style={styles.glowAura} />;
}

/* 🌟 Sparkle Burst */
function SparkleBurst() {
  return (
    <>
      <style>
        {`
          @keyframes sparkle {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
          }
        `}
      </style>
      <div style={styles.sparkle} />
    </>
  );
}

/* 🎉 Confetti */
function Confetti() {
  return (
    <>
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
        `}
      </style>
      <div style={styles.confettiContainer}>
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "8px",
              height: "14px",
              background: i % 2 === 0 ? "hotpink" : "#ffd1dc",
              left: Math.random() * 100 + "%",
              top: "-20px",
              animation: "fall 3s linear infinite",
              animationDelay: Math.random() * 2 + "s",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </>
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
    color: "white",
    fontFamily: "sans-serif",
    textAlign: "center",
    overflow: "hidden",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 160px)",
    gridTemplateRows: "repeat(3, 160px)",
    gap: "8px",
    marginTop: "20px",
  },
  magicButton: {
    marginTop: "10px",
    padding: "10px 16px",
    background: "hotpink",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
  },
  revealWrapper: {
    position: "relative",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  finalImage: {
    width: 420,
    height: 420,
    objectFit: "contain",
    borderRadius: "20px",
    animation: "zoom 6s ease forwards",
  },
  overlayText: {
    position: "absolute",
    bottom: "-50px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
    textShadow: "0 0 10px hotpink",
  },
  glowAura: {
    position: "absolute",
    width: 460,
    height: 460,
    background: "radial-gradient(circle, hotpink 0%, transparent 70%)",
    filter: "blur(40px)",
    zIndex: -1,
  },
  sparkle: {
    position: "absolute",
    width: "20px",
    height: "20px",
    background: "white",
    borderRadius: "50%",
    animation: "sparkle 1s ease-out forwards",
  },
  confettiContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    top: 0,
  },
};
