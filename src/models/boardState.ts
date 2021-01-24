import { CellState } from "./cellState";

export class BoardState {
  readonly cellStates: Array<CellState>;

  constructor() {
    const cells: Array<CellState> = [];
    for (let i=0; i<6; i++) {
      
      const numbers = this.getShuffledArray();
      for (let j=0; j<6; j++) {
        cells.push(new CellState({proper: numbers[j]}))
      }      
    }
    this.cellStates = cells;
  }

  private getShuffledArray(): number[] {
    const initial = [0,1,2,3,4,5];
    for (let i=0; i<6; i++) {
      const index = Math.floor(Math.random()*6);
      const temp = initial[i];
      initial[i] = initial[index];
      initial[index] = temp;
    }
    return initial;
  }
}