import './App.css';
import './Game.css'; 
import React, { useState, useEffect, useCallback } from "react";

// cor que deve ser adivinhada
const CurrentColor = React.memo(({ color }) => {
  return <div style={{ backgroundColor: color }} className='ColorBox'>Guess this color</div>;
});

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
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('highScore')) || 0);
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [timeLeft, setTimeLeft] = useState(10);
  const [history, setHistory] = useState([])
 
  const generateColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const nextRound = useCallback(() => {
    const newColor = generateColor(); // gera cor aleatória
    setCurrentColor(newColor); // adiciona na cor que deve ser acertada
    const newOptions = [newColor]; // adiciona no array 
    while (newOptions.length < 3) {  // enquanto as opções forem menor que 3 adiciona mais opções aleatórias no array, se a opção por coincidência ja existir não adiciona.
      const option = generateColor();
      if (!newOptions.includes(option)) {
        newOptions.push(option);
      }
    }
    // embaralha as opções
    setOptions(newOptions.sort(() => Math.random() - 0.5));
  }, []);

  const startGame = () => {
    setScore(0); // restarta o score
    setGameStatus('inProgress'); // muda status ao começar
    setTimeLeft(10); // restarta o tempo quando inicia o jogo
    nextRound(); // inicia uma rodada gerando uma cor, adicionando opções e embaralhando-as

    // depois de 30s muda o status do game para terminado
    setTimeout(() => {
      setGameStatus('ended');
    }, 30000);
  };

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

    const timeTaken = 10 - timeLeft;

    setHistory(prevHistory => [...prevHistory, { answer, isCurrentColor: isCurrentColor }])
  }, [gameStatus, currentColor, nextRound]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score);
    }

    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId); // limpa o temporizador se o componente for desmontado
    } else if (gameStatus === 'inProgress') {
      handleAnswer(null); // tratado como uma resposta errada se o tempo acabar
    }
  }, [timeLeft, gameStatus, highScore, score, handleAnswer, nextRound]);

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
                <button onClick={startGame}>Start</button>
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
