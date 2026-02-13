import { useEffect, useState } from "react";
import puzzleImage from "../assets/puzzle.jpg";

export default function RoomThree({ onComplete }) {
  const size = 3;
  const tileSize = 135; // slightly larger
  const total = size * size;

  const solved = [...Array(total - 1).keys()]
    .map(i => i + 1)
    .concat(null);

  // 🧠 Fair scramble (always solvable)
  const shuffleSolvable = () => {
    let arr = [...solved];
    let emptyIndex = arr.indexOf(null);

    for (let i = 0; i < 25; i++) {
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

  // 🔓 Unlock magic every 50 moves
  useEffect(() => {
    if (moves > 0 && moves % 50 === 0) {
      setMagicAvailable(true);
    }
  }, [moves]);

  // 🏁 Detect completion
  useEffect(() => {
    if (JSON.stringify(tiles) === JSON.stringify(solved)) {
      setCompleted(true);

      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3500);
    }
  }, [tiles]);

  const isCorrect = (tile, index) =>
    tile === solved[index];

  return (
    <div style={styles.container}>
      <h2>🧩 Complete the Picture</h2>
      <p>Moves: {moves}</p>

      {/* ✨ Magic Button */}
      {magicAvailable && !magicMode && !completed && (
        <button
          onClick={() => setMagicMode(true)}
          style={styles.magicButton}
        >
          ✨ Magic Swap Available
        </button>
      )}

      {/* 🧩 GRID */}
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
                  borderRadius: "10px",
                  cursor: magicMode
                    ? "grab"
                    : canMove(index)
                    ? "pointer"
                    : "default",
                  transition: "all 0.3s ease",
                  boxShadow: correct
                    ? "0 0 20px hotpink"
                    : "none",
                }}
              />
            );
          })}
        </div>
      )}

      {/* 🎉 FINAL REVEAL (GRID COMPLETELY GONE) */}
      {completed && (
        <div style={styles.revealWrapper}>
          <img
            src={puzzleImage}
            alt="Completed"
            style={styles.finalImage}
          />
          <Confetti />
        </div>
      )}
    </div>
  );
}

function Confetti() {
  return (
    <div style={styles.confettiContainer}>
      {[...Array(50)].map((_, i) => (
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
    color: "white",
    fontFamily: "sans-serif",
    textAlign: "center",
    overflow: "hidden",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 130px)",
    gridTemplateRows: "repeat(4, 130px)",
    gap: "6px",
    marginTop: "20px",
  },
  magicButton: {
    marginTop: "10px",
    padding: "10px 16px",
    background: "hotpink",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  revealWrapper: {
    position: "relative",
    marginTop: "20px",
  },
  finalImage: {
    width: 4 * 130,
    height: 4 * 130,
    objectFit: "cover",
    borderRadius: "15px",
    animation: "fadeIn 1s ease",
  },
  confettiContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    top: 0,
  },
  confetti: {
    position: "absolute",
    width: "8px",
    height: "14px",
    background: "hotpink",
    top: "-20px",
    animation: "fall 3s linear infinite",
  },
};
