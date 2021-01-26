import {AppliedResult, GenericClue} from "./genericClue";
import {ClueItem} from "./clueItem";
import {BoardState} from "../boardState";
import {randomInt} from "../../service/randomService";
import {updateBoardStateWithCell} from "../../service/gameService";

export class TwoNotAdjacentClue extends GenericClue {

  constructor(items: Array<ClueItem>, isUsed = false) {
    super({
      descr: 'Items {0} and {2} should NOT be placed in adjacent columns',
      items: items,
      isUsed: isUsed,
    });
  }

  static generateClue(board: BoardState): TwoNotAdjacentClue {
    let line1 = randomInt(6);
    let line2 = randomInt(6);
    let position1 = randomInt(6);
    let adjacents = [];
    if (position1 > 0) {
      adjacents.push(board.getCell(line2, position1-1).properSolution);
    }
    if (position1 < 5) {
      adjacents.push(board.getCell(line2, position1+1).properSolution);
    }
    let item1 = board.getCell(line1, position1).properSolution;
    let item2;
    do {
      item2 = randomInt(6);
    } while (adjacents.includes(item2));
    let first = new ClueItem(line1, item1);
    let second =  new ClueItem(line2, item2);
    return new TwoNotAdjacentClue([first, second]);
  }

  applyToBoard(state: BoardState): AppliedResult {
    let newState = state.clone();

    let result1 = this.checkNotAdjacent(this.items[0], this.items[1], newState);
    let result2 = this.checkNotAdjacent(this.items[1], this.items[0], result1.state);
    return {state: result2.state, isApplied: result1.isApplied || result2.isApplied};
  }

  checkNotAdjacent(first: ClueItem, second: ClueItem, state: BoardState): AppliedResult {
    let newState = state.clone();
    let isApplied = false;
    for (let i=0; i<6; i++) {
      let stateFirst = newState.getCell(first.line, i);
      if (stateFirst.isResolvedTo(first.item)) {
        if (i > 0) {
          let stateSecond = newState.getCell(second.line, i - 1);
          if (stateSecond.hasPossibleItem(second.item)) {
            newState = updateBoardStateWithCell(newState, stateSecond.removePossibleTurn(second.item))
            isApplied = true;
          }
        }
        if (i < 5) {
          let stateSecond = newState.getCell(second.line, i + 1);
          if (stateSecond.hasPossibleItem(second.item)) {
            newState = updateBoardStateWithCell(newState, stateSecond.removePossibleTurn(second.item))
            isApplied = true;
          }
        }
      }
    }
    return { state: newState, isApplied: isApplied };
  }

  setUsed(isUsed: boolean): TwoNotAdjacentClue {
    if (this.isUsed === isUsed) {
      return this;
    }
    return new TwoNotAdjacentClue(this.items, isUsed);
  }

}