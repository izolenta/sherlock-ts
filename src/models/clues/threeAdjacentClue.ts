import {AppliedResult, GenericClue} from "./genericClue";
import {ClueItem} from "./clueItem";
import {BoardState} from "../boardState";
import {randomInt} from "../../service/randomService";
import {updateBoardStateWithCell} from "../../service/gameService";

export class ThreeAdjacentClue extends GenericClue {

  constructor(items: Array<ClueItem>, isUsed = false) {
    super({
      descr: 'Items {0}, {2} and {1} should be placed in adjacent columns. The order can be different, but {2} should be always in the middle, i.e. {0}{2}{1} or {1}{2}{0}.\n' +
        'Also this means that {2} cannot be in leftmost and rightmost columns.',
      items: items,
      isUsed: isUsed,
    });
  }

  applyToBoard(state: BoardState): AppliedResult {
    let newState = state.clone();
    let result1 = ThreeAdjacentClue.checkCenterItemNotAtBounds(this.items[2], newState);
    let result2 = ThreeAdjacentClue.checkThreeAdjacent(this.items[0], this.items[1], this.items[2], result1.state);
    let result3 = ThreeAdjacentClue.checkThreeAdjacent(this.items[1], this.items[0], this.items[2], result2.state);
    return {state: result3.state, isApplied: result1.isApplied || result2.isApplied || result3.isApplied};
  }

  setUsed(isUsed: boolean): ThreeAdjacentClue {
    if (this.isUsed === isUsed) {
      return this;
    }
    return new ThreeAdjacentClue(this.items, isUsed);
  }

  private static checkCenterItemNotAtBounds(center: ClueItem, state: BoardState): AppliedResult {
    let isApplied = false;
    let newState = state.clone();
    let stateThird = state.getCell(center.line, 0);
    if (stateThird.hasPossibleItem(center.item)) {
      newState = updateBoardStateWithCell(newState, stateThird.removePossibleTurn(center.item));
      isApplied = true;
    }
    stateThird = state.getCell(center.line, 5);
    if (stateThird.hasPossibleItem(center.item)) {
      newState = updateBoardStateWithCell(newState, stateThird.removePossibleTurn(center.item));
      isApplied = true;
    }
    return {state: newState, isApplied: isApplied};
  }

  private static checkThreeAdjacent(first: ClueItem, second: ClueItem, third: ClueItem, state: BoardState): AppliedResult {
    let isApplied = false;
    let newState = state.clone();
    for (let i=0; i<6; i++) {
      let stateFirst = newState.getCell(first.line, i);
      if (stateFirst.hasPossibleItem(first.item)) {
        let adjacentFound = false;
        if (i > 1) {
          let stateThird = newState.getCell(third.line, i-1);
          let stateSecond = newState.getCell(second.line, i-2);
          if (stateSecond.hasPossibleItem(second.item) && stateThird.hasPossibleItem(third.item)) {
            adjacentFound = true;
          }
        }
        if (!adjacentFound && i < 4) {
          let stateSecond = state.getCell(second.line, i+2);
          let stateThird = state.getCell(third.line, i+1);
          if (stateSecond.hasPossibleItem(second.item) && stateThird.hasPossibleItem(third.item)) {
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

  static generateClue(state: BoardState): ThreeAdjacentClue  {
    const line1 = randomInt(6);
    const line2 = randomInt(6);
    const line3 = randomInt(6);
    const position3 = randomInt(4)+1;
    let position1 = position3-1;
    let position2 = position3+1;
    if (randomInt(2) === 1) {
      const temp = position1;
      position1 = position2;
      position2 = temp;
    }
    const item1 = state.getCell(line1, position1).properSolution;
    const item2 = state.getCell(line2, position2).properSolution;
    const item3 = state.getCell(line3, position3).properSolution;

    const first = new ClueItem(line1, item1);
    const second = new ClueItem(line2, item2);
    const third = new ClueItem(line3, item3);

    return new ThreeAdjacentClue([first, second, third]);
  }
}