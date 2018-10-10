import React, { Component } from 'react';
import Login from './components/Login.jsx'
import Board from './components/Board/Board.jsx'
import UserDashboarContainer from '/Users/nicholassmith/Desktop/minnow/client/containers/UserDashboardContainer.jsx'
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
        <UserDashboarContainer/>
        {/* <Board /> */}
      </div>
    )
  }
}


export default App