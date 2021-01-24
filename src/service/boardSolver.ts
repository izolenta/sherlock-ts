import {BoardState} from "../models/boardState";
import {GenericClue} from "../models/clues/genericClue";
import {optimizeBoard} from "./gameService";

export function trySolve(board: BoardState, clues: GenericClue[]): BoardState {
  let newBoard = board.clone();
  while(true) {
    let isApplied = false;
    for (let clue of clues) {
      const result = clue.applyToBoard(newBoard);
      newBoard = result.state;
      if (result.isApplied) {
        isApplied = true;
        newBoard = optimizeBoard(newBoard);
      }
    }
    if (!isApplied || newBoard.isResolved()) {
      break;
    }
  }
  return newBoard;
}