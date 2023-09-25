import { useGame } from "../context/GameContext";

export const ScoreBoard = () => {
  const { highScore, score, generalTimeout, gameStatus } = useGame();

  return (
    <>
      <p>High Score: {highScore}</p>
      {gameStatus === "inProgress" && (
        <p>
          <span
            style={{
              backgroundColor: "gray",
              fontSize: "40px",
              borderRadius: "4px",
              marginLeft: "4px",
              width: "30px",
              height: "30px",
            }}
          >
            {generalTimeout}
          </span>
        </p>
      )}
      <p>Score: {score}</p>
    </>
  );
};
