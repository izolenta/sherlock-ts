import { CellState } from "./cellState";
import {initRandomBoard} from "../service/gameService";

export class BoardState {
  readonly cellStates: Array<CellState>;

  constructor(cells: Array<CellState> = initRandomBoard()) {
    this.cellStates = cells;
  }

  isStillCorrect(): boolean {
    for (let next of this.cellStates) {
      if (next.isSolved() && !next.isResolvedTo(next.properSolution)) {
        return false;
      }
    }
    return true;
  }

  getCell(line: number, index: number) : CellState {
    return this.getCellByIndex(line*6+index);
  }

  getCellByIndex(index: number) : CellState {
    return this.cellStates[index];
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
