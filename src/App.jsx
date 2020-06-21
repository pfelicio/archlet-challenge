import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

import Board from "./components/Board/Board";

import utils from "./utils/utils";

class App extends Component {
   constructor(props) {
      super(props);
   }

   tick = () => {
      const newCells = utils.calculateTick(this.props.cells);
      this.props.onTick(newCells);
   };
   start = () => {
      this.tick();
      this.props.onStart(setInterval(this.tick, this.props.tick));
   };
   stop = () => {
      this.props.onStop();
   };
   reset = () => {
      this.props.onStop();
      this.props.onTick(
         utils.initBoard({
            x: this.props.cells.length,
            y: this.props.cells[0].length,
         })
      );
   };
   incrX = () => {
      this.props.onXIncrement();
   };
   incrY = () => {
      this.props.onYIncrement();
   };
   decrX = () => {
      this.props.onXDecrement();
   };
   decrY = () => {
      this.props.onYDecrement();
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
            <button onClick={this.incrY}>Y +</button>
            <button onClick={this.decrY}>Y -</button>

            <Board></Board>
         </React.Fragment>
      );
   }
}

function mapStateToProps(state) {
   return {
      size: state.main.size,
      tick: state.main.tick,
      cells: state.main.cells,
   };
}

function mapDispatchToProps(dispatch) {
   return {
      onStart: (tickerHandle) => {
         dispatch({
            type: "START",
            tickerHandle: tickerHandle,
         });
      },
      onStop: () => dispatch({ type: "STOP" }),
      onTick: (cells) => {
         dispatch({ type: "TICK", cells: cells });
      },
      onXIncrement: () => dispatch({ type: "X_INCREMENT" }),
      onXDecrement: () => dispatch({ type: "X_DECREMENT" }),
      onYIncrement: () => dispatch({ type: "Y_INCREMENT" }),
      onYDecrement: () => dispatch({ type: "Y_DECREMENT" }),
   };
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
