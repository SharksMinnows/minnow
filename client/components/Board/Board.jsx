import React, { Component } from 'react';
import TestStuff from './TestStuff';
import './Board.scss'

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <canvas class="board"></canvas>
    )
  }
}

export default Board