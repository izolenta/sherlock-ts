import { CellState } from "./cellState";
import {initRandomBoard} from "../service/gameService";

export class BoardState {
  readonly cellStates: Array<CellState>;

  constructor(cells: Array<CellState> = initRandomBoard()) {
    this.cellStates = cells;
  }

  getCell(line: number, index: number) : CellState {
    return this.cellStates[line*6+index];
  }
}
