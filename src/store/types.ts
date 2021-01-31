import {GenericClue} from "../models/clues/genericClue";

export const GO_TO_GAME = 'GO_TO_GAME';
export const GO_TO_SETTINGS = 'GO_TO_SETTINGS';
export const USE_CLUE = 'USE_CLUE';
export const RESOLVE_CELL = 'RESOLVE_CELL';
export const UNDO = 'UNDO';
export const GO_TO_LAST_CORRECT = 'GO_TO_LAST_CORRECT';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const START_NEW_GAME = 'START_NEW_GAME';
export const CYCLE_DIFFICULTY = 'CYCLE_DIFFICULTY';

interface GoToGameAction {
  type: typeof GO_TO_GAME
}

interface GoToSettingsAction {
  type: typeof GO_TO_SETTINGS
}

interface UseClueAction {
  type: typeof USE_CLUE
  payload: GenericClue,
}

interface ResolveCellAction {
  type: typeof RESOLVE_CELL
  payload: { index: number, card: number },
}

interface RemoveItemAction {
  type: typeof REMOVE_ITEM
  payload: { index: number, card: number },
}

interface UndoAction {
  type: typeof UNDO
}

interface GoToLastCorrectAction {
  type: typeof GO_TO_LAST_CORRECT
}

interface StartNewGameAction {
  type: typeof START_NEW_GAME
}

interface CycleDifficultyAction {
  type: typeof CYCLE_DIFFICULTY
}

export type SherlockAction = GoToGameAction | GoToSettingsAction | UseClueAction
  | StartNewGameAction | CycleDifficultyAction | ResolveCellAction | RemoveItemAction | UndoAction
  | GoToLastCorrectAction;