import { SherlockState } from '../models/sherlockState';
import { TAction } from './actions';
import * as types from './types';

const reducer = (state: SherlockState, action: TAction): SherlockState => {
  const { type } = action;
  switch (type) {
    case types.GO_TO_GAME:
      return { ...state, isRulesOn: false };
    case types.GO_TO_SETTINGS:
      return { ...state, isRulesOn: true };
    default:
      return state;
  }
};
export default reducer;
