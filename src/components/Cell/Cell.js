import React, { Component } from "react";

import classes from "./Cell.module.css";

class Cell extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const className = this.props.alive ? classes.CellAlive : classes.CellDead;
      const cellStyle = {
         top: `${this.props.y * 5}em`,
         left: `${this.props.x * 5}em`,
      };
      return <div style={cellStyle} className={className}></div>;
   }
}

export default Cell;
