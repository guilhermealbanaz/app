import { GameStatus } from '../components/GameStatus';
import { ScoreBoard } from '../components/ScoreBoard';
import { StartButton } from './StartButton';
import { GameOver } from './GameOver';
import { GameInProgress } from './GameInProgress';

export const Main = () => {

  return (
    <div className="Main">
      <h1>Color Guessing Game</h1>
      <GameStatus />
      <ScoreBoard />
      <StartButton />
      <GameInProgress />
      <GameOver />
    </div>
  );
}