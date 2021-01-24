import { GameState } from '../models/gameState';
import {SherlockState} from '../models/sherlockState'
const initialState: SherlockState = {
  isRulesOn: true,
  gameState: new GameState({}),
} 

export default initialState;