import {AppliedResult, GenericClue} from "./genericClue";
import {ClueItem} from "./clueItem";
import {BoardState} from "../boardState";
import {updateBoardStateWithCell} from "../../service/gameService";
import {randomInt} from "../../service/randomService";

export class TwoInSameColumnClue extends GenericClue {
  constructor(items: Array<ClueItem>, isUsed = false) {
    super({
      descr: 'Items {0} and {1} should be placed in same column',
      items: items,
      isUsed: isUsed,
    });
  }

  static generateClue(state: BoardState) : TwoInSameColumnClue {
    const line1 = randomInt(6);
    let line2;
    do {
      line2 = randomInt(6);
    } while (line1 === line2);
    const position1 = randomInt(6);
    const item1 = state.getCell(line1, position1).properSolution;
    const item2 = state.getCell(line2, + position1).properSolution;
    const first = new ClueItem(line1, item1);
    const second = new ClueItem(line2, item2);
    return new TwoInSameColumnClue([first, second]);
  }

  setUsed(isUsed: boolean): TwoInSameColumnClue {
    if (this.isUsed === isUsed) {
      return this;
    }
    return new TwoInSameColumnClue(this.items, isUsed);
  }

  applyToBoard(state: BoardState): AppliedResult {
    const first = this.items[0];
    const second = this.items[1];
    let isApplied = false;
    let newState = state.clone();

    for (let i = 0; i < 6; i++) {
      const cell1 = newState.getCell(first.line, i);
      const cell2 = newState.getCell(second.line, i);
      if (!cell1.hasPossibleItem(first.item) && cell2.hasPossibleItem(second.item)) {
        newState = updateBoardStateWithCell(newState, cell2.removePossibleTurn(second.item));
        isApplied = true;
      }
      if (!cell2.hasPossibleItem(second.item) && cell1.hasPossibleItem(first.item)) {
        newState = updateBoardStateWithCell(newState, cell1.removePossibleTurn(first.item));
        isApplied = true;
      }
      if (cell1.isResolvedTo(first.item) && !cell2.isResolvedTo(second.item)) {
        newState = updateBoardStateWithCell(newState, cell2.resolveTo(second.item));
        isApplied = true;
      }
      if (cell2.isResolvedTo(second.item) && !cell1.isResolvedTo(first.item)) {
        newState = updateBoardStateWithCell(newState, cell1.resolveTo(first.item));
        isApplied = true;
      }
    }
    return {state: newState, isApplied: isApplied};
  }
}