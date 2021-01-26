import {GenericClue} from "../models/clues/genericClue";

export const GO_TO_GAME = 'GO_TO_GAME';
export const GO_TO_SETTINGS = 'GO_TO_SETTINGS';
export const USE_CLUE = 'USE_CLUE';

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

export type SherlockAction = GoToGameAction | GoToSettingsAction | UseClueAction;