import { useGame } from '../context/GameContext';
import './Global.css';

export const GameStatus = () => {
  const { gameStatus, timeLeft } = useGame();

  return gameStatus === "inProgress" && <p>Time left: {timeLeft} seconds</p>;
}
