import React, { Component } from "react";
import classes from "./Board.module.css";

import Cell from "../Cell/Cell";

class Board extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const width = this.props.x * 5;
      const height = this.props.y * 5;
      const style = {
         width: `${width}em`,
         height: `${height}em`,
         backgroundColor: "lightgrey",
         position: "relative",
      };
      return (
         <div style={style}>
            {this.props.cells.map((col, i) => {
               return col.map((alive, j) => {
                  return (
                     <Cell key={`${i}-${j}`} alive={alive} x={i} y={j}></Cell>
                  );
               });
            })}
         </div>
      );
   }
}

export default Board;
