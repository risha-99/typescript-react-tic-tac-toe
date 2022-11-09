import { useState } from 'react';
import './App.css';
import { Board } from './Board';
import "./css/app.css";

function App() {

  return (
    <div className="App">
      <div className='winner shrink'>
        <div className='winner-text'></div>
      </div>
      <Board/>
    </div>
  );
}

export default App;
