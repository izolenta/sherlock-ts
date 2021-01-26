import {SherlockState} from '../models/sherlockState';
import {GO_TO_GAME, GO_TO_SETTINGS, SherlockAction, USE_CLUE} from './types';
import {replaceElement} from "../util/util";

const reducer = (state: SherlockState, action: SherlockAction): SherlockState => {
  switch (action.type) {
    case GO_TO_GAME:
      return { ...state, isRulesOn: false };
    case GO_TO_SETTINGS:
      return { ...state, isRulesOn: true };
    case USE_CLUE:
      return {
        ...state,
        gameState: {
          ...state.gameState,
          clueSet: replaceElement(
            state.gameState.clueSet,
            action.payload,
            action.payload.setUsed(!action.payload.isUsed)
          )
        }
      };
    default:
      return state;
  }
};
export default reducer;
