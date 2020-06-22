# Game of Life

> This is my take on [Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life).

## Install

Clone or download the repository:

```sh
git clone https://github.com/pfelicio/archlet-challenge.git archlet-challenge
cd archlet-challenge
```

Then install dependencies:

```sh
npm install
```

## Start

Start the app by typing:

```sh
npm start
```

Then navigate to [http://localhost:3000]

## Usage

Use the control buttons on top to Start/Stop the game.
Available Controls:

-  **Tick**: Manually advance a tick (a tick is a generation)
-  **Reset**: Reset the board
-  **Start/Stop**: Start/Pause the Game
-  **X +/Y +**: Add a column/row to the board
-  **X -/Y -**: Remove last column/row of the board

## ToDos

-  [ ] Create separate component for the controls (and maybe a higher order ControlPanel)
-  [ ] Add shouldComponentUpdate to the cells to prevent them from rerendering if prop `alive` didn't change
-  [ ] Replace immutability-helper with `immer` as recommended in the Redux Style Guide
-  [ ] Compose reducer better. Separate logic into functions (and actually use `combineReducers`)
-  [ ] Make it look nicer
-  [ ] Add control to maximize board to the view
-  [ ] Control tick length
