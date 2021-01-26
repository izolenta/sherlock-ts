export class CellState {
  readonly possibleTurns: number;
  readonly properSolution: number;
  readonly index: number;

  constructor(index: number, {turns = 63, proper = 0}) {
    this.possibleTurns = turns;
    this.properSolution = proper;
    this.index = index;
  }

  isSolved(): boolean {
    return (this.possibleTurns & (this.possibleTurns-1)) === 0;
  }

  hasPossibleItem(item: number) {
    return (this.possibleTurns & Math.pow(2, item)) !== 0;
  }

  isResolvedTo(item: number): boolean {
    return this.isSolved() && this.getCurrentSolution() === item;
  }

  isProperlySolved(): boolean {
    return this.getCurrentSolution() === this.properSolution;
  } 

  getCurrentSolution(): number {
    if (this.isSolved()) {
      for (let i=0; i<6; i++) {
        if ((this.possibleTurns & Math.pow(2, i)) !== 0) {
          return i;
        }
      }
    }
    throw new RangeError('Cell is not resolved!');
  }

  removePossibleTurn(item: number): CellState {
    this.checkItem(item);
    let newState = this.possibleTurns - Math.pow(2,item);
    return new CellState(this.index, {turns: newState, proper: this.properSolution});
  }

  resolveTo(item: number): CellState {
    if (this.hasPossibleItem(item)) {
      return new CellState(this.index, {turns: Math.pow(2, item), proper: this.properSolution})
    }
    throw new RangeError('Cannot resolve to this item - not possible move!');
  }

  private checkItem(item: number) {
    if (item < 0 || item > 5) {
      throw new RangeError('Wrong item to resolve');
    }
    if (!this.hasPossibleItem(item)) {
      throw new RangeError('this cell does not contain the item!');
    }
  }
}