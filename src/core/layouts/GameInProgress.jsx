import { useGame } from '../context/GameContext';
import { CurrentColor } from '../components/CurrentColor';
import { ColorOptions } from '../components/ColorOptions';

export const GameInProgress = () => {
    const { gameStatus } = useGame();
  
    return gameStatus === "inProgress" && (
      <>
        <CurrentColor />
        <ColorOptions />
      </>
    );
  }