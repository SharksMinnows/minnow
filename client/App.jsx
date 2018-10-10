import React, { Component } from 'react';
import Login from './components/Login.jsx'
import Board from './components/Board/Board.jsx'
//sass//
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Login />
      </div>
    )
  }
}


export default App