import React, { Component } from 'react';
import Board from './components/Board/Board.jsx'

//sass//
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    )
  }
}


export default App