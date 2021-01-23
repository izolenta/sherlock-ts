import { TAction } from './actions';
import { SherlockState } from './initialState';
import * as types from './types';

const reducer = (state: SherlockState, action: TAction): SherlockState => {
  const { type, payload } = action;
  switch (type) {
    case types.GO_TO_GAME:
      return { ...state, isRulesOn: false };
      default:
        return state;
    }
};
export default reducer;
