import React, { Component } from "react";
import classes from "./Board.module.css";
import { connect } from "react-redux";

import Cell from "../Cell/Cell";

class Board extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const width = this.props.cells.length * this.props.cellSize;
      const height = this.props.cells[0].length * this.props.cellSize;
      const style = {
         width: `${width}em`,
         height: `${height}em`,
      };

      return (
         <div style={style} className={classes.Board}>
            {this.props.cells.map((col, i) => {
               return col.map((alive, j) => {
                  return (
                     <Cell
                        key={`${i}-${j}`}
                        alive={alive}
                        x={i}
                        y={j}
                        cellSize={this.props.cellSize}
                     ></Cell>
                  );
               });
            })}
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      cells: state.main.cells,
      cellSize: state.main.cellSize,
   };
};

export default connect(mapStateToProps)(Board);
