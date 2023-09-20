import './App.css';
import React from "react";
import { Main } from './core/layouts/Main.jsx'
import { History } from './core/components/History.jsx'

function App() {
  return (
    <div className="App">
      <div className="Game">
        <History />
        <Main />
      </div>
    </div>
  );
}

export default App;
