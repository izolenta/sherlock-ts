import {AppliedResult, GenericClue} from "./genericClue";
import {ClueItem} from "./clueItem";
import {BoardState} from "../boardState";
import {randomInt} from "../../service/randomService";
import {updateBoardStateWithCell} from "../../service/gameService";

export class OneShouldBeBeforeOtherClue extends GenericClue {
  constructor(items: Array<ClueItem>, isUsed = false) {
    super({
      descr: 'The item {0} should be placed in the column to the left (not necessarily adjacent left) of {1}\n' +
        'Also this means that {0} cannot be in rightmost column, and {1} cannot be in leftmost column.',
      items: items,
      isUsed: isUsed,
    });
  }

  applyToBoard(state: BoardState): AppliedResult {
    let isApplied = false;
    let mostLeft = 0;
    let mostRight = 5;
    let newState = state.clone();
    const first = this.items[0];
    const second = this.items[1];
    for (let i=0; i<6; i++) {
      const cell = newState.getCell(first.line, i);
      if (cell.hasPossibleItem(first.item)) {
        mostLeft = i;
        break;
      }
    }
    for (let i=5; i>-1; i--) {
      const cell = newState.getCell(second.line, i);
      if (cell.hasPossibleItem(second.item)) {
        mostRight = i;
        break;
      }
    }
    for (let i=0; i<=mostLeft; i++) {
      const cell = newState.getCell(second.line, i);
      if (cell.hasPossibleItem(second.item)) {
        newState = updateBoardStateWithCell(newState, cell.removePossibleTurn(second.item));
        isApplied = true;
      }
    }
    for (let i=5; i>=mostRight; i--) {
      const cell = newState.getCell(first.line, i);
      if (cell.hasPossibleItem(first.item)) {
        newState = updateBoardStateWithCell(newState, cell.removePossibleTurn(first.item));
      }
    }

    return {state: newState, isApplied: isApplied};
  }

  setUsed(isUsed: boolean): OneShouldBeBeforeOtherClue {
    if (this.isUsed === isUsed) {
      return this;
    }
    return new OneShouldBeBeforeOtherClue(this.items, isUsed);
  }

  static generateClue(state: BoardState): OneShouldBeBeforeOtherClue {
    const line1 = randomInt(6);
    const line2 = randomInt(6);
    const position1 = randomInt(5);
    const position2 = randomInt(5 - position1) + position1 + 1;
    const item1 = state.getCell(line1, position1).properSolution;
    const item2 = state.getCell(line2, position2).properSolution;
    const first = new ClueItem(line1, item1);
    const second = new ClueItem(line2, item2);
    return new OneShouldBeBeforeOtherClue([first, second]);
  }

}