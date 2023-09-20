import { useGame } from '../context/GameContext';
import { ResetAllData } from '../components/ResetAllData';

export const GameOver = () => {
    const { gameStatus, startGame, resetData } = useGame();
  
    return gameStatus === "ended" && (
      <>
        <p>Game Over!</p>
        <button onClick={startGame}>Play Again</button>
        <ResetAllData onClick={resetData}/>
      </>
    );
  }