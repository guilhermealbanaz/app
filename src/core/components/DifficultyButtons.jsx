import { useGame } from '../context/GameContext';

export const DifficultyButtons = () => {
    const { difficulty, handleDifficultyChange } = useGame();

    return (
      <div>
        <button style={{ cursor: 'pointer', backgroundColor: difficulty === 3 ? '#bfbaba' : '#4caf50' }} onClick={() => handleDifficultyChange(3)}>Fácil</button>
        <button style={{ cursor: 'pointer', backgroundColor: difficulty === 4 ? '#bfbaba' : '#4caf50' }} onClick={() => handleDifficultyChange(4)}>Médio</button>
        <button style={{ cursor: 'pointer', backgroundColor: difficulty === 5 ? '#bfbaba' : '#4caf50' }} onClick={() => handleDifficultyChange(5)}>Difícil</button>
      </div>
    );
  }