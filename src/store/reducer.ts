import {SherlockState} from '../models/sherlockState';
import {
  CYCLE_DIFFICULTY,
  GO_TO_GAME,
  GO_TO_LAST_CORRECT,
  GO_TO_SETTINGS,
  REMOVE_ITEM,
  RESOLVE_CELL,
  SherlockAction,
  START_NEW_GAME,
  UNDO,
  USE_CLUE
} from './types';
import {replaceElement} from "../util/util";
import {initRandomConfiguration, optimizeLine, updateBoardStateWithCell} from "../service/gameService";
import UIFx from 'uifx';

// @ts-ignore
import itemRemoved from '../sounds/item_removed.mp3';
// @ts-ignore
import gameStarted from '../sounds/cell_opened.mp3';

const itemRemovedAsset = new UIFx(itemRemoved);
const gameStartedAsset = new UIFx(gameStarted);

const reducer = (state: SherlockState, action: SherlockAction): SherlockState => {

  switch (action.type) {
    case GO_TO_GAME:
      itemRemovedAsset.play();
      return { ...state, isRulesOn: false };
    case GO_TO_SETTINGS:
      itemRemovedAsset.play();
      return { ...state, isRulesOn: true };
    case START_NEW_GAME:
      gameStartedAsset.play();
      let newState = {
        ...state,
        gameState: initRandomConfiguration(state.gameState.difficulty)};
      return newState;
    case CYCLE_DIFFICULTY:
      let difficulty = state.gameState.difficulty-1;
      if (difficulty < 0) {
        difficulty = 2;
      }
      gameStartedAsset.play();
      return {
        ...state,
        gameState: initRandomConfiguration(difficulty)
      };
    case UNDO:
      itemRemovedAsset.play();
      const prevStates1 = state.gameState.prevStates;
      const newState1 = prevStates1[prevStates1.length-1];
      const newPrev1 = prevStates1.slice(0, prevStates1.length-1);
      return {
        ...state,
        gameState: {
          ...state.gameState,
          prevStates: newPrev1,
          boardState: newState1,
        }
      };
    case GO_TO_LAST_CORRECT:
      itemRemovedAsset.play();
      let prevStates2 = state.gameState.prevStates;
      let currState1 = state.gameState.boardState;
      while(!currState1.isStillCorrect()) {
        currState1 = prevStates2[prevStates2.length-1];
        prevStates2 = prevStates2.slice(0, prevStates2.length-1);
      }
      return {
        ...state,
        gameState: {
          ...state.gameState,
          prevStates: prevStates2,
          boardState: currState1,
        }
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
    case RESOLVE_CELL:
      const cell1 = state.gameState.boardState.getCellByIndex(action.payload.index);
      const line1 = Math.floor(action.payload.index / 6);
      const updatedState1 =
        optimizeLine(updateBoardStateWithCell(state.gameState.boardState, cell1.resolveTo(action.payload.card)), line1);
      itemRemovedAsset.play();
      return {
        ...state,
        gameState: {
          ...state.gameState,
          prevStates: [...state.gameState.prevStates, state.gameState.boardState],
          boardState: updatedState1}
      };
    case REMOVE_ITEM:
      const cell2 = state.gameState.boardState.getCellByIndex(action.payload.index);
      const line2 = Math.floor(action.payload.index / 6);
      const updatedState2 =
        optimizeLine(
          updateBoardStateWithCell(state.gameState.boardState, cell2.removePossibleTurn(action.payload.card)), line2);
      itemRemovedAsset.play();
      return {
        ...state,
        gameState: {
          ...state.gameState,
          prevStates: [...state.gameState.prevStates, state.gameState.boardState],
          boardState: updatedState2}
      };

    default:
      return state;
  }
};
export default reducer;
