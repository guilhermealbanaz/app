import { useGame } from '../context/GameContext';
import { DifficultyButtons } from '../components/DifficultyButtons';
import { ResetAllData } from '../components/ResetAllData';

export const StartButton = () => {
    const { gameStatus, startGame, resetData } = useGame();
  
    return gameStatus === "notStarted" && (
      <>
        <button onClick={startGame}>Start</button>
        <DifficultyButtons />
        <ResetAllData onClick={resetData}/>
      </>
    );
  }