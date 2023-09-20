import { useGame } from '../context/GameContext';

export const ScoreBoard = () => {
    const { highScore, score } = useGame();

    return (
      <>
        <p>High Score: {highScore}</p>
        <p>Score: {score}</p>
      </>
    );
  }