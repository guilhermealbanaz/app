import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';

export const ProgressBar = () => {
  const { timeLeft } = useGame();

  useEffect(() => {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.width = ((timeLeft / 10) * 100) + '%';
    }
  }, [timeLeft]);

  return (
    <div className="progress-bar-container">
      <div id="progress-bar" className="progress-bar"></div>
    </div>
  );
};