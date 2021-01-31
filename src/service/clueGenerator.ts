import {BoardState} from "../models/boardState";
import {GenericClue} from "../models/clues/genericClue";
import {TwoInSameColumnClue} from "../models/clues/twoInSameColumnClue";
import {TwoAdjacentClue} from "../models/clues/twoAdjacentClue";
import {OneShouldBeBeforeOtherClue} from "../models/clues/oneShouldBeBeforeOtherClue";
import {ThreeAdjacentClue} from "../models/clues/threeAdjacentClue";
import {TwoNotAdjacentClue} from "../models/clues/twoNotAdjacentClue";
import {TwoNotInSameColumnClue} from "../models/clues/twoNotInSameColumnClue";

export function generateClueSet(board: BoardState, difficulty: number) {

  let clues = new Array<GenericClue>();
  for (let i = 0; i < 10 + difficulty * 4; i++) {
    let clue;
    do {
      clue = TwoInSameColumnClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }
  for (let i=0; i<10;i++) {
    let clue;
    do {
      clue = TwoAdjacentClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }
  for (let i=0; i<10; i++) {
    let clue;
    do {
      clue = OneShouldBeBeforeOtherClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }
  for (let i=0; i<10; i++) {
    let clue;
    do {
      clue = ThreeAdjacentClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }

  for (let i=0; i<10; i++) {
    let clue;
    do {
      clue = TwoNotAdjacentClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }

  for (let i=0; i<10; i++) {
    let clue;
    do {
      clue = TwoNotInSameColumnClue.generateClue(board);
    } while (containsClue(clues, clue));
    clues.push(clue);
  }

  return clues;
}

function containsClue(clues: GenericClue[], clue: GenericClue) {
  for (let next of clues) {
    if (clue.isEqual(next)) {
      return true;
    }
  }
  return false;
}
