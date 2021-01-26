import {GenericClue} from "../models/clues/genericClue";

export const GO_TO_GAME = 'GO_TO_GAME';
export const GO_TO_SETTINGS = 'GO_TO_SETTINGS';
export const USE_CLUE = 'USE_CLUE';
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

interface StartNewGameAction {
  type: typeof START_NEW_GAME
}

interface CycleDifficultyAction {
  type: typeof CYCLE_DIFFICULTY
}

export type SherlockAction = GoToGameAction | GoToSettingsAction | UseClueAction
  | StartNewGameAction | CycleDifficultyAction;