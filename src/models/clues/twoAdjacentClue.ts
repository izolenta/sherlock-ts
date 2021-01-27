import {AppliedResult, GenericClue} from "./genericClue";
import {ClueItem} from "./clueItem";
import {BoardState} from "../boardState";
import {randomInt} from "../../service/randomService";
import {updateBoardStateWithCell} from "../../service/gameService";

export class TwoAdjacentClue extends GenericClue {

  constructor(items: Array<ClueItem>, isUsed = false) {
    super({
      descr: 'Items {0} and {2} should be placed in adjacent columns, but the order can be different, i.e. {0}{2} or {2}{0}',
      items: items,
      isUsed: isUsed,
    });
  }

  applyToBoard(state: BoardState): AppliedResult {
    const first = this.items[0];
    const second = this.items[1];
    let newState = state.clone();
    let result1 = this.checkAdjacent(first, second, newState);
    let result2 = this.checkAdjacent(first, second, result1.state);
    return {state: result2.state, isApplied: result1.isApplied || result2.isApplied};
  }

  private checkAdjacent(first: ClueItem, second: ClueItem, state: BoardState): AppliedResult {
    let isApplied = false;
    let newState = state.clone();
    for (let i=0; i<6; i++) {
      const stateFirst = newState.getCell(first.line, i);
      if (stateFirst.hasPossibleItem(first.item)) {
        let adjacentFound = false;
        if (i > 0) {
          const stateSecond = newState.getCell(second.line, i-1);
          if (stateSecond.hasPossibleItem(second.item)) {
            adjacentFound = true;
          }
        }
        if (!adjacentFound && i < 5) {
          const stateSecond = newState.getCell(second.line, i+1);
          if (stateSecond.hasPossibleItem(second.item)) {
            adjacentFound = true;
          }
        }
        if (!adjacentFound) {
          newState = updateBoardStateWithCell(newState, stateFirst.removePossibleTurn(first.item));
          isApplied = true;
        }
      }
    }
    return {state: newState, isApplied: isApplied};
  }

  setUsed(isUsed: boolean): TwoAdjacentClue {
    if (this.isUsed === isUsed) {
      return this;
    }
    return new TwoAdjacentClue(this.items, isUsed);
  }

  static generateClue(state: BoardState): TwoAdjacentClue {
    const line1 = randomInt(6);
    const line2 = randomInt(6);
    let position1 = randomInt(5);
    let position2 = position1+1;
    if (randomInt(2) === 1) {
      const temp = position1;
      position1 = position2;
      position2 = temp;
    }
    const item1 = state.getCell(line1, position1).properSolution;
    const item2 = state.getCell(line2, position2).properSolution;
    const first = new ClueItem(line1, item1);
    const second =  new ClueItem(line2, item2);
    return new TwoAdjacentClue([first, second]);
  }
}