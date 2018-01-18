import React, { Component } from 'react';
import './App.css';
import Board from './components/board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title">Welcome to Kaarya</span>
        </header>
        <div className="App-body">
          <Board name="Name of the board"></Board>
        </div>
      </div>
    );
  }
}

export default App;
