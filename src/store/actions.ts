import * as types from './types';

export interface AppStartAction {
  type: types.APP_START_ACTION;
  payload: {}
}

export type TAction = AppStartAction;