import { useGame } from '../context/GameContext';

export const History = () => {
    const { history } = useGame();

    return (
      <div className="Sidebar">
        <h2>History</h2>
		<label>Resposta</label>
        <ul style={{padding: '0'}}>
          {history.map((entry, index) => (
            <li style={{ marginBottom: '15px', listStyleType: 'none', width: '180px', display: 'flex', alignItems: 'center', gap: '10px'}}key={index}>
              <div style={{ textAlign: 'center', backgroundColor: entry.answer, borderRadius: '3px', minWidth:'70px', maxWidth: '70px', padding: '10px' }}>{entry.answer}</div> correct: {entry.isCurrentColor ? 'V' : 'X'}
            </li>
          ))}
        </ul>
      </div>
    );
  }