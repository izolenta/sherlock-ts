import { BoardState } from "./boardState";
import { GenericClue } from "./clues/genericClue";
import * as diff from '../models/gameDifficulties.d';

export class GameState {
  readonly boardState: BoardState;
  readonly clueSet: GenericClue[];
  readonly difficulty: number;
  readonly prevStates: BoardState[];

  constructor({
    state= new BoardState(),
    clueset = new Array<GenericClue>(),
    difficulty=diff.DIFFICULTY_EASY,
    prevStates = new Array<BoardState>()})
  {
    this.boardState = state;
    this.clueSet = clueset;
    this.difficulty = difficulty;
    this.prevStates = prevStates;
  }
}