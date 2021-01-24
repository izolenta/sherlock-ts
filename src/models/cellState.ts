import {without} from "typescript-array-utils";

export class CellState {
  readonly possibleTurns: number[];
  readonly properSolution: number;
  readonly index: number;

  constructor(index: number, {turns = [0,1,2,3,4,5], proper = 0}) {
    this.possibleTurns = turns;
    this.properSolution = proper;
    this.index = index;
  }

  isSolved(): boolean {
    return this.possibleTurns.length === 1;
  }

  hasPossibleItem(item: number) {
    return this.possibleTurns.includes(item);
  }

  isResolvedTo(item: number): boolean {
    return this.getCurrentSolution() === item;
  }

  isProperlySolved(): boolean {
    return this.possibleTurns.length === 1 && this.possibleTurns[0] === this.properSolution;
  } 

  getCurrentSolution(): number | undefined {
    if (this.isSolved()) {
      return this.possibleTurns[0];
    }
    return undefined;
  }

  removePossibleTurn(item: number): CellState {
    return new CellState(this.index, {turns: without(this.possibleTurns, item), proper: this.properSolution});
  }

  resolveTo(item: number): CellState {
    if (this.hasPossibleItem(item)) {
      return new CellState(this.index, {turns: [item], proper: this.properSolution})
    }
    throw new RangeError('Cannot resolve to this item - not possible move!');
  }
}