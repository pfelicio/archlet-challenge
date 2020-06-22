import React, { Component } from "react";

import classes from "./Cell.module.css";

class Cell extends Component {
   constructor(props) {
      super(props);
   }

   shouldComponentUpdate(nextProps) {
      const diffs = Object.keys(this.props).map(
         (prop) => nextProps[prop] === this.props[prop]
      );

      return diffs.indexOf(false) >= 0 ? true : false;
   }

   render() {
      const className = this.props.alive ? classes.CellAlive : classes.CellDead;
      const cellStyle = {
         top: `${this.props.y * this.props.cellSize}em`,
         left: `${this.props.x * this.props.cellSize}em`,
         width: `${this.props.cellSize}em`,
         height: `${this.props.cellSize}em`,
      };

      return <div style={cellStyle} className={className}></div>;
   }
}

export default Cell;
