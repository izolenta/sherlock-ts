import {GO_TO_GAME, GO_TO_SETTINGS, SherlockAction, USE_CLUE} from "./types";
import {GenericClue} from '../models/clues/genericClue';

export function createGoToGameAction(): SherlockAction {
  return {
    type: GO_TO_GAME
  }
}

export function createGoToSettingsAction(): SherlockAction {
  return {
    type: GO_TO_SETTINGS
  }
}

export function createUseClueAction(clue: GenericClue): SherlockAction {
  return {
    type: USE_CLUE,
    payload: clue,
  }
}
