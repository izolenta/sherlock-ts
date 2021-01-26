import {AppliedResult, GenericClue} from "./genericClue";
import {BoardState} from "../boardState";
import {ClueItem} from "./clueItem";
import {randomInt} from "../../service/randomService";
import {updateBoardStateWithCell} from "../../service/gameService";

export class TwoNotInSameColumnClue extends GenericClue {

  constructor(items: Array<ClueItem>, isUsed = false) {
    super({
      descr: 'Items {0} and {1} should NOT be placed in same column',
      items: items,
      isUsed: isUsed,
    });
  }

  static generateClue(board: BoardState) : TwoNotInSameColumnClue{
    let line1 = randomInt(6);
    let line2 = randomInt(6);
    let position1 = randomInt(6);
    let position2;
    do {
      position2 = randomInt(6);
    } while (position1 === position2);
    let item1 = board.getCell(line1, position1).properSolution;
    let item2 = board.getCell(line2, position2).properSolution;
    let first = new ClueItem(line1, item1);
    let second =  new ClueItem(line2, item2);
    return new TwoNotInSameColumnClue([first, second]);
  }

  applyToBoard(state: BoardState): AppliedResult {
    let newState = state.clone();
    let isApplied = false;
    let first = this.items[0];
    let second = this.items[1];
    for (let i=0; i<6; i++) {
      let firstState = newState.getCell(first.line, i);
      let secondState = newState.getCell(second.line, i);
      if (firstState.isResolvedTo(first.item) && secondState.hasPossibleItem(second.item)) {
        newState = updateBoardStateWithCell(newState, secondState.removePossibleTurn(second.item));
        isApplied = true;
      }
      if (secondState.isResolvedTo(second.item) && firstState.hasPossibleItem(first.item)) {
        newState = updateBoardStateWithCell(newState, firstState.removePossibleTurn(first.item));
        isApplied = true;
      }
    }
    return {state: newState, isApplied: isApplied};
  }

  setUsed(isUsed: boolean): TwoNotInSameColumnClue {
    if (this.isUsed === isUsed) {
      return this;
    }
    return new TwoNotInSameColumnClue(this.items, isUsed);
  }

}