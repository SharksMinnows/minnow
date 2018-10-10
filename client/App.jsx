import React, { Component } from 'react';
import Login from './components/Login.jsx'
import Board from './components/Board/Board.jsx'
import UserStatsContainer from '/Users/nicholassmith/Desktop/minnow/client/containers/UserStatsContainer.jsx'
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
        <UserStatsContainer/>
        {/* <Board /> */}
      </div>
    )
  }
}


export default App