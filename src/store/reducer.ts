import { TAction } from './actions';
import { SherlockState } from './initialState';
import * as types from './types';

const reducer = (state: SherlockState, action: TAction): SherlockState => {
  const { type, payload } = action;
  switch (type) {
    case types.APP_START:
      return { ...state, message: "OOPA" };
      default:
        return state;
    }
};
export default reducer;
