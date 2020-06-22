import { combineReducers } from "redux";
import update from "immutability-helper";
import utils from "../utils/utils";

const BOARD_X = 10;
const BOARD_Y = 10;

const initialSize = { x: BOARD_X, y: BOARD_Y };

const initialState = {
   size: initialSize,
   tick: 1000,
   cells: utils.initBoard(initialSize),
   running: false,
   cellSize: 5, //in em
   tickerHandle: null,
};

function main(state = initialState, action) {
   switch (action.type) {
      case "START":
         return update(state, {
            running: { $set: true },
            tickerHandle: { $set: action.tickerHandle },
         });

      case "STOP": {
         clearInterval(state.tickerHandle);
         return update(state, {
            running: { $set: false },
            tickerHandle: { $set: null },
         });
      }
      case "TICK": {
         return update(state, {
            cells: { $set: action.cells },
         });
      }
      case "X_INCREMENT": {
         return update(state, {
            cells: { $push: [state.cells[0].map((c) => false)] },
         });
      }
      case "X_DECREMENT": {
         return update(state, {
            cells: { $splice: [[state.cells.length - 1, 1]] },
         });
      }
      case "Y_INCREMENT": {
         return update(state, {
            cells: {
               $set: [
                  ...state.cells.map((col) => {
                     return [...col, false];
                  }),
               ],
            },
         });
      }
      case "Y_DECREMENT": {
         return update(state, {
            cells: {
               $set: [
                  ...state.cells.map((col) => {
                     const newCol = [...col];
                     newCol.pop();
                     return newCol;
                  }),
               ],
            },
         });
      }
   }

   return state;
}

export default combineReducers({
   main,
});
