import { useGame } from '../context/GameContext';

export const ColorOptions = () => {
    const { options, handleAnswer } = useGame();

    return (
        <div className='boxOptions'>
            {options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)} >
                    {option}
                </button>
            ))}
        </div>
    );
  };