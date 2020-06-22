import utils from "../../utils/utils";

test("initBoard: should init board", () => {
   jest.spyOn(global.Math, "random").mockReturnValue(0.4);

   const board = utils.initBoard({ x: 2, y: 2 });

   global.Math.random.mockRestore();

   expect(board).toMatchObject([
      [false, false],
      [false, false],
   ]);
});

test("initBoard: should return empty array", () => {
   const board = utils.initBoard({ x: 0, y: 0 });

   expect(board).toMatchObject([]);
});

test("getLiveNeighbours: should return neighbours", () => {
   const board = [
      [false, true, false],
      [true, false, false],
      [false, false, false],
   ];

   const neigh00 = utils.getLiveNeighbours(board, 0, 0);
   const neigh01 = utils.getLiveNeighbours(board, 0, 1);
   const neigh02 = utils.getLiveNeighbours(board, 0, 2);
   const neigh10 = utils.getLiveNeighbours(board, 1, 0);
   const neigh11 = utils.getLiveNeighbours(board, 1, 1);
   const neigh12 = utils.getLiveNeighbours(board, 1, 2);
   const neigh20 = utils.getLiveNeighbours(board, 2, 0);
   const neigh21 = utils.getLiveNeighbours(board, 2, 1);
   const neigh22 = utils.getLiveNeighbours(board, 2, 2);

   expect(neigh00).toBe(2);
   expect(neigh01).toBe(1);
   expect(neigh02).toBe(1);
   expect(neigh10).toBe(1);
   expect(neigh11).toBe(2);
   expect(neigh12).toBe(1);
   expect(neigh20).toBe(1);
   expect(neigh21).toBe(1);
   expect(neigh22).toBe(0);
});

test("calculateTick: should calculate rule 1", () => {
   //Any live cell with fewer than two live neighbours dies

   const board = [
      [true, false, false],
      [false, false, true],
      [false, false, true],
   ];

   const newBoard = utils.calculateTick(board);

   expect(newBoard[0][0]).toBe(false);
   expect(newBoard[2][2]).toBe(false);
});

test("calculateTick: should calculate rule 2", () => {
   //Any live cell with two or three live neighbours lives on to the next generation

   const board = [
      [true, false, false],
      [true, true, true],
      [false, true, false],
   ];

   const newBoard = utils.calculateTick(board);

   expect(newBoard[0][0]).toBe(true);
   expect(newBoard[2][1]).toBe(true);
});

test("calculateTick: should calculate rule 3", () => {
   //Any live cell with more than three live neighbours dies

   const board = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
   ];

   const newBoard = utils.calculateTick(board);

   expect(newBoard[0][1]).toBe(false);
   expect(newBoard[1][0]).toBe(false);
   expect(newBoard[1][1]).toBe(false);
   expect(newBoard[2][1]).toBe(false);
});

test("calculateTick: should calculate rule 4", () => {
   //Any dead cell with exactly three live neighbours becomes a live cell

   const board = [
      [false, true, false],
      [true, true, false],
      [false, false, false],
   ];

   const newBoard = utils.calculateTick(board);

   expect(newBoard[0][0]).toBe(true);
});
