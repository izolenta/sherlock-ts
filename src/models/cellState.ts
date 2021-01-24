export class CellState {
  readonly possibleTurns: number[];
  readonly properSolution: number;

  constructor({turns = [0,1,2,3,4,5], proper = 0}) {
    this.possibleTurns = turns;
    this.properSolution = proper;
  }

  isSolved(): boolean {
    return this.possibleTurns.length === 1;
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
}