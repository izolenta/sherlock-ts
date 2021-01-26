import {SherlockState} from '../models/sherlockState';
import {CYCLE_DIFFICULTY, GO_TO_GAME, GO_TO_SETTINGS, SherlockAction, START_NEW_GAME, USE_CLUE} from './types';
import {replaceElement} from "../util/util";
import {initRandomConfiguration} from "../service/gameService";

const reducer = (state: SherlockState, action: SherlockAction): SherlockState => {
  switch (action.type) {
    case GO_TO_GAME:
      return { ...state, isRulesOn: false };
    case GO_TO_SETTINGS:
      return { ...state, isRulesOn: true };
    case START_NEW_GAME:
      return {
        ...state,
        gameState: initRandomConfiguration(state.gameState.difficulty)
      };
    case CYCLE_DIFFICULTY:
      let difficulty = state.gameState.difficulty-1;
      if (difficulty < 0) {
        difficulty = 2;
      }
      return {
        ...state,
        gameState: initRandomConfiguration(difficulty)
      };
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
