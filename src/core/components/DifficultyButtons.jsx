import { useGame } from '../context/GameContext';
import './Global.css';

export const DifficultyButtons = () => {
    const { difficulty, handleDifficultyChange } = useGame();
  
    return (
      <div>
        <button style={{ cursor: 'pointer', backgroundColor: difficulty === 3 ? '#f2df7e' : 'initial' }} onClick={() => handleDifficultyChange(3)}>Fácil</button>
        <button style={{ cursor: 'pointer', backgroundColor: difficulty === 4 ? '#f2df7e' : 'initial' }} onClick={() => handleDifficultyChange(4)}>Médio</button>
        <button style={{ cursor: 'pointer', backgroundColor: difficulty === 5 ? '#f2df7e' : 'initial' }} onClick={() => handleDifficultyChange(5)}>Difícil</button>
      </div>
    );
  }