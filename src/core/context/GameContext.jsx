import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    () => Number(localStorage.getItem("highScore")) || 0
  );
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [timeLeft, setTimeLeft] = useState();
  const [history, setHistory] = useState([]);
  const [difficulty, setDifficulty] = useState(3);
  const scoreRef = useRef(score);
  const [generalTimeout, setGeneralTimeout] = useState(30);

  const resetData = () => {
    localStorage.clear();
    setHighScore(0);
    setScore(0);
    setGameStatus("notStarted");
    setHistory([]);
    setDifficulty(3);
    setGeneralTimeout(30);
  };

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
    while (newOptions.length < difficulty) {
      // enquanto as opções forem menor que o numero de opções referente ao nivel de dificuldade adiciona mais opções aleatórias no array, se a opção por coincidência ja existir não adiciona.
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
    setGeneralTimeout(30);
    setScore(0); // restarta o score
    setGameStatus("inProgress"); // muda status ao começar
    setTimeLeft(10); // restarta o tempo quando inicia o jogo
    nextRound(); // inicia uma rodada gerando uma cor, adicionando opções e embaralhando-as

    // depois de 30s muda o status do game para terminado
    setTimeout(() => {
      setHighScore((currentHighScore) => {
        const newHighScore =
          scoreRef.current > currentHighScore
            ? scoreRef.current
            : currentHighScore;
        localStorage.setItem("highScore", newHighScore);
        return newHighScore;
      });
      setGameStatus("ended");
    }, 30000);
  }, [nextRound]);

  const handleAnswer = useCallback(
    (answer) => {
      const isCurrentColor = answer === currentColor;
      if (gameStatus !== "inProgress") return;
      if (isCurrentColor) {
        setScore((prevScore) => prevScore + 5);
      } else {
        setScore((prevScore) => prevScore - 1);
      }
      setTimeLeft(10);
      nextRound();

      setHistory((prevHistory) => [
        ...prevHistory,
        { answer, isCurrentColor: isCurrentColor },
      ]);
    },
    [currentColor, gameStatus, nextRound]
  );

  useEffect(() => {
    let gameTimeout = setTimeout(() => {
      setGeneralTimeout(generalTimeout - 1);
    }, 1000);
    return () => clearTimeout(gameTimeout);
  }, [generalTimeout]);

  useEffect(() => {
    let timerId;

    if (timeLeft > 0) {
      timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (gameStatus === "inProgress") {
      handleAnswer(null); // tratado como uma resposta errada se o tempo acabar
    }
    return () => clearTimeout(timerId);
  }, [timeLeft, gameStatus, handleAnswer, nextRound]);

  const props = {
    currentColor,
    options,
    score,
    highScore,
    gameStatus,
    timeLeft,
    history,
    difficulty,
    resetData,
    handleDifficultyChange,
    startGame,
    handleAnswer,
    generalTimeout,
  };

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  return <GameContext.Provider value={props}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
