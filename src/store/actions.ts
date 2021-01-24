import * as types from './types';

export interface GoToGameAction {
  type: types.GO_TO_GAME_TYPE;
}

export interface GoToSettingsAction {
  type: types.GO_TO_SETTINGS_TYPE;
}

export type TAction = GoToGameAction | GoToSettingsAction;