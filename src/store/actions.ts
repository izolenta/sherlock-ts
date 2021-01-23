import * as types from './types';

export interface GoToGameAction {
  type: types.GO_TO_GAME_ACTRION;
  payload: {}
}

export type TAction = GoToGameAction;