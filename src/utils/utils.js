function initBoard({ x, y }) {
   let board = [];
   for (let i = 0; i < x; i++) {
      board[i] = [];
      for (let j = 0; j < y; j++) {
         board[i][j] = Math.round(Math.random()) ? true : false;
      }
   }

   return board;
}

function getLiveNeighbours(cells, x, y) {
   let liveNeighbours = 0;

   const maxX = cells.length;
   const maxY = cells[x].length;

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
}

function calculateTick(oldBoard) {
   let board = [];

   for (let i = 0; i < oldBoard.length; i++) {
      board[i] = [];
      for (let j = 0; j < oldBoard[i].length; j++) {
         const liveNeighbours = getLiveNeighbours(oldBoard, i, j);
         if (oldBoard[i][j]) {
            board[i][j] =
               liveNeighbours === 2 || liveNeighbours === 3 ? true : false;
         } else {
            board[i][j] = liveNeighbours === 3 ? true : false;
         }
      }
   }
   return board;
}

export default {
   initBoard,
   getLiveNeighbours,
   calculateTick,
};
