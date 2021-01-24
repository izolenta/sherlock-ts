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

  isResolved(): boolean {
    return this.getNotResolvedCellCount() === 0;
  }

  getNotResolvedCellCount(): number {
    let count = 0;
    for (let next of this.cellStates) {
      if (!next.isSolved()) {
        count++;
      }
    }
    return count;
  }

  clone(): BoardState {
    return new BoardState(Array.from(this.cellStates));
  }
}
