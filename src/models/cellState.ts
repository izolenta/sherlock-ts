import {removeElement} from "../util/util";

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
    return this.isSolved() && this.getCurrentSolution() === item;
  }

  isProperlySolved(): boolean {
    return this.possibleTurns.length === 1 && this.possibleTurns[0] === this.properSolution;
  } 

  getCurrentSolution(): number {
    if (this.isSolved()) {
      return this.possibleTurns[0];
    }
    throw new RangeError('Cell is not resolved!');
  }

  removePossibleTurn(item: number): CellState {
    return new CellState(this.index, {turns: removeElement(this.possibleTurns, item), proper: this.properSolution});
  }

  resolveTo(item: number): CellState {
    if (this.hasPossibleItem(item)) {
      return new CellState(this.index, {turns: [item], proper: this.properSolution})
    }
    throw new RangeError('Cannot resolve to this item - not possible move!');
  }
}