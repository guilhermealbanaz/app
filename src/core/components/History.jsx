import { useGame } from '../context/GameContext';
import './Global.css';

export const History = () => {
    const { history } = useGame();
  
    return (
      <div className="Sidebar">
        <h2>History</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              Answer: {entry.answer}, correct: {entry.isCurrentColor ? 'V' : 'X'}
            </li>
          ))}
        </ul>
      </div>
    );
  }