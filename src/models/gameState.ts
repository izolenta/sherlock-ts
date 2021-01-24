import { BoardState } from "./boardState";
import { GenericClue } from "./clues/genericClue";
import * as diff from '../models/gameDifficulties.d';

export class GameState {
  readonly boardState: BoardState;
  readonly clueSet: Array<GenericClue>;
  readonly difficulty: number;

  constructor({state=new BoardState(), clueset=[], difficulty=diff.DIFFICULTY_EASY}) {
    this.boardState = state;
    this.clueSet = clueset;
    this.difficulty = difficulty;
  }
}