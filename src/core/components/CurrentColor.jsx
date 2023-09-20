import { useGame } from '../context/GameContext';
import './Global.css';

export const CurrentColor = () => {
    const { currentColor } = useGame();
  
    return <div style={{ backgroundColor: currentColor, width: '300px', height: '300px' }} className='ColorBox' />;
}