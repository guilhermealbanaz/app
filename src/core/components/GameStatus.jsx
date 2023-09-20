import { useGame } from '../context/GameContext';
import { ProgressBar } from './ProgressBar';

export const GameStatus = () => {
  const { gameStatus } = useGame();

  return gameStatus === "inProgress" && <ProgressBar />;
}
