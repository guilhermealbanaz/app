import './App.css';
import './Game.css';
import React, { useState, useEffect, useCallback, useRef } from "react";

// cor que deve ser adivinhada
const CurrentColor = React.memo(({ color }) => {
  return <div style={{ backgroundColor: color }} className='ColorBox'>Guess this color</div>;
});

const ResetAllData = ({onClick}) => {
	return <button onClick={onClick}>Reset All Data</button>
}

// opções
const ColorOptions = React.memo(({ options, onAnswer }) => {
  return options.map((option, index) => (
    <button key={index} onClick={() => onAnswer(option)} >
      {option}
    </button>
  ));
});

function Game() {
  const [currentColor, setCurrentColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('high')) || 0);
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [timeLeft, setTimeLeft] = useState(10);
  const [history, setHistory] = useState([]);
  const [difficulty, setDifficulty] = useState(3);
  const scoreRef = useRef(score);

  const resetData = () => {
	localStorage.clear();
	setHighScore(0);
	setScore(0);
	setGameStatus('notStarted');
	setHistory([]);
	setDifficulty(3);
  }

  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
  }, []);

  const generateColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const nextRound = useCallback(() => {
    const newColor = generateColor(); // gera cor aleatória
    setCurrentColor(newColor); // adiciona na cor que deve ser acertada
    const newOptions = [newColor]; // adiciona no array
    while (newOptions.length < difficulty) {  // enquanto as opções forem menor que o numero de opções referente ao nivel de dificuldade adiciona mais opções aleatórias no array, se a opção por coincidência ja existir não adiciona.
      const option = generateColor();
      if (!newOptions.includes(option)) {
        newOptions.push(option);
      }
    }
    // embaralha as opções
    setOptions(newOptions.sort(() => Math.random() - 0.5));
  }, [difficulty]);

  const startGame = useCallback(() => {
    setHistory([]);
    setScore(0); // restarta o score
    setGameStatus('inProgress'); // muda status ao começar
    setTimeLeft(10); // restarta o tempo quando inicia o jogo
    nextRound(); // inicia uma rodada gerando uma cor, adicionando opções e embaralhando-as

    // depois de 30s muda o status do game para terminado
    setTimeout(() => {
		setHighScore((currentHighScore) => {
			const newHighScore = scoreRef.current > currentHighScore ? scoreRef.current : currentHighScore;
			localStorage.setItem('highScore', newHighScore);
			return newHighScore;
		  });
		  setGameStatus('ended');
	}, 30000);
	}, [nextRound]);

  const handleAnswer = useCallback((answer) => {
    const isCurrentColor = answer === currentColor;
    if (gameStatus !== 'inProgress') return;
    if (isCurrentColor) {
      setScore(prevScore => prevScore + 5);
    } else {
      setScore(prevScore => prevScore - 1);
    }
    setTimeLeft(10);
    nextRound();

    setHistory(prevHistory => [...prevHistory, { answer, isCurrentColor: isCurrentColor }])
  }, [currentColor, gameStatus, nextRound]);

  useEffect(() => {
    let timerId;
	if (timeLeft > 0) {
		timerId = setTimeout(() => {
		setTimeLeft(timeLeft - 1);
		}, 1000);
	} else if (gameStatus === 'inProgress') {
		handleAnswer(null); // tratado como uma resposta errada se o tempo acabar
	}
  	return () => clearTimeout(timerId);
  }, [timeLeft, gameStatus, handleAnswer, nextRound]);

  useEffect(() => {
	scoreRef.current = score;
  }, [score]);

  return (
    <div className="App">
    <div className="Game">
        <div className="Sidebar">
            <h2>History</h2>
            <ul>
                { history.map((entry, index) => (
                    <li key={index}>
                        Answer: {entry.answer}, correct: {entry.isCurrentColor ? 'V' : 'X'}
                    </li>
                )) }
            </ul>
        </div>
        <div className="Main">
            <h1>Color Guessing Game</h1>
            {gameStatus === "inProgress" && <p>Time left: {timeLeft} seconds</p>}
            <p>High Score: {highScore}</p>
            <p>Score: {score}</p>
            {gameStatus === "notStarted" && (
                <>
					<button onClick={startGame}>Start</button>
					<div>
						<button style={{ cursor: 'pointer', backgroundColor: difficulty === 3 ? '#f2efd3' : 'initial' }} onClick={() => handleDifficultyChange(3)}>Fácil</button>
						<button style={{ cursor: 'pointer', backgroundColor: difficulty === 4 ? '#f2efd3' : 'initial' }} onClick={() => handleDifficultyChange(4)}>Médio</button>
						<button style={{ cursor: 'pointer', backgroundColor: difficulty === 5 ? '#f2efd3' : 'initial' }} onClick={() => handleDifficultyChange(5)}>Difícil</button>
					</div>
					<ResetAllData onClick={resetData}/>
				</>
			)}
            {gameStatus === "inProgress" && (
                <>
                    <CurrentColor color={currentColor} />
                    <ColorOptions options={options} onAnswer={handleAnswer} />
                </>
            )}

            {gameStatus === "ended" && (
                <>
                    <p>Game Over!</p>
                    <button onClick={startGame}>Play Again</button>
					<ResetAllData onClick={resetData}/>
                </>
            )}
        </div>
    </div>
</div>
);
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
