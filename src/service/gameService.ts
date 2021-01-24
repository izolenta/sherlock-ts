import {GameState} from "../models/gameState";
import {BoardState} from "../models/boardState";
import {CellState} from "../models/cellState";

export function generateGame(difficulty: number): GameState {
  const board = new BoardState();

  return new GameState({state: board, clueset: [], difficulty: difficulty, prevStates:[]});
}

export function initRandomBoard(): Array<CellState> {
  const cells: Array<CellState> = [];
  for (let i = 0; i < 6; i++) {

    const numbers = getShuffledArray();
    for (let j = 0; j < 6; j++) {
      cells.push(new CellState(i*6+j, {proper: numbers[j]}))
    }
  }
  return cells;
}

function getShuffledArray(): number[] {
  const initial = [0,1,2,3,4,5];
  for (let i=0; i<6; i++) {
    const index = Math.floor(Math.random()*6);
    const temp = initial[i];
    initial[i] = initial[index];
    initial[index] = temp;
  }
  return initial;
}

export function updateBoardStateWithCell(state: BoardState, cell: CellState) {
  return new BoardState([...state.cellStates.slice(0, cell.index), cell, ...state.cellStates.slice(cell.index+1)]);
}