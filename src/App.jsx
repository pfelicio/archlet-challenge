import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

import Board from "./components/Board/Board";

const BOARD_X = 10;
const BOARD_Y = 10;

class App extends Component {
   constructor(props) {
      super(props);
      const size = { x: BOARD_X, y: BOARD_X };

      this.state = {
         size: size,
         tick: 1000,
         cells: this.initBoard(size),
         running: false,
      };
   }

   initBoard = ({ x, y }) => {
      let board = [];
      for (let i = 0; i < x; i++) {
         board[i] = [];
         for (let j = 0; j < y; j++) {
            board[i][j] = Math.round(Math.random()) ? true : false;
         }
      }
      return board;
   };

   tick = () => {
      let board = [];

      for (let i = 0; i < this.state.size.x; i++) {
         board[i] = [];
         for (let j = 0; j < this.state.size.y; j++) {
            const liveNeighbours = this.getLiveNeighbours(i, j);
            if (this.state.cells[i][j]) {
               board[i][j] =
                  liveNeighbours === 2 || liveNeighbours === 3 ? true : false;
            } else {
               board[i][j] = liveNeighbours === 3 ? true : false;
            }
         }
      }

      this.setState({
         cells: board,
      });
   };

   reset = () => {
      this.stop();
      this.setState({
         cells: this.initBoard(this.state.size),
      });
   };

   start = () => {
      this.tick();
      this.ticker = setInterval(this.tick, this.state.tick);
      this.setState({ running: true });
   };

   stop = () => {
      clearInterval(this.ticker);
      this.setState({ running: false });
   };

   incrX = () => {
      const newSize = { ...this.state.size };
      newSize.x++;
      this.setState({
         size: newSize,
         cells: this.initBoard(newSize),
      });
   };

   decrX = () => {
      const newSize = { ...this.state.size };
      newSize.x--;
      this.setState({
         size: newSize,
         cells: this.initBoard(newSize),
      });
   };

   getLiveNeighbours = (x, y) => {
      let liveNeighbours = 0;

      const cells = this.state.cells;
      const maxX = this.state.size.x;
      const maxY = this.state.size.y;

      if (x > 0 && y > 0) liveNeighbours += cells[x - 1][y - 1] ? 1 : 0;
      if (y > 0) liveNeighbours += cells[x][y - 1] ? 1 : 0;
      if (x < maxX - 1 && y > 0) liveNeighbours += cells[x + 1][y - 1] ? 1 : 0;
      if (x > 0) liveNeighbours += cells[x - 1][y] ? 1 : 0;
      if (x < maxX - 1) liveNeighbours += cells[x + 1][y] ? 1 : 0;
      if (x > 0 && y < maxY - 1) liveNeighbours += cells[x - 1][y + 1] ? 1 : 0;
      if (y < maxY - 1) liveNeighbours += cells[x][y + 1] ? 1 : 0;
      if (x < maxX - 1 && y < maxY - 1)
         liveNeighbours += cells[x + 1][y + 1] ? 1 : 0;

      return liveNeighbours;
   };

   render() {
      return (
         <React.Fragment>
            <button onClick={this.tick}>Tick</button>
            <button onClick={this.reset}>Reset</button>
            <button onClick={this.start}>Start</button>
            <button onClick={this.stop}>Stop</button>
            <button onClick={this.incrX}>X +</button>
            <button onClick={this.decrX}>X -</button>

            <Board
               x={this.state.size.x}
               y={this.state.size.y}
               cells={this.state.cells}
            ></Board>
         </React.Fragment>
      );
   }
}

function mapStateToProps(state) {
   return {
      hello: state.hello,
   };
}

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
