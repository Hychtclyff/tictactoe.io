import { useState } from "react";

function Squere({ value, onSquereClick }) {
  return (
    <button className="square" onClick={onSquereClick}>
      {value}
    </button>
  );
}

function TheWinner({ squares }) {
  const winner = calculateWinner(squares);
  return (
    <div className="status-winners">
      <span>the Winner is {winner}</span>
    </div>
  );
}

function TheTurn({ xIsNext }) {
  return (
    <div className="frame-panel">
      <div
        className="frame-turn"
        style={{
          borderBottomColor: xIsNext ? "blue" : "white",
          transition: "opacity 0.5s",
          opacity: xIsNext ? 1 : 0.5,
        }}
      >
        X
      </div>
      <div
        className="frame-turn"
        style={{
          borderBottomColor: xIsNext ? "white" : "blue",
          transition: "opacity 0.5s",
          opacity: xIsNext ? 0.5 : 1,
        }}
      >
        O
      </div>
    </div>
  );
}

function StatusGame({ squares, xIsNext }) {
  return (
    <div className="frame-status">
      {calculateWinner(squares) ? (
        <TheWinner squares={squares} />
      ) : (
        <>
          <TheTurn xIsNext={xIsNext} />
        </>
      )}
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  return (
    <div className="frame-game">
      <StatusGame xIsNext={xIsNext} squares={squares} />

      <div className="board">
        <Squere value={squares[0]} onSquereClick={() => handleClick(0)} />
        <Squere value={squares[1]} onSquereClick={() => handleClick(1)} />
        <Squere value={squares[2]} onSquereClick={() => handleClick(2)} />
        <Squere value={squares[3]} onSquereClick={() => handleClick(3)} />
        <Squere value={squares[4]} onSquereClick={() => handleClick(4)} />
        <Squere value={squares[5]} onSquereClick={() => handleClick(5)} />
        <Squere value={squares[6]} onSquereClick={() => handleClick(6)} />
        <Squere value={squares[7]} onSquereClick={() => handleClick(7)} />
        <Squere value={squares[8]} onSquereClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHisory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function hadndlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHisory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game Start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <h3>TIC TAC TOE</h3>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={hadndlePlay}
          />
        </div>
        <div className="game-info">{/* <ol>{moves}</ol> */}</div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}
