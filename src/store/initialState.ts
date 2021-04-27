import {SherlockState} from '../models/sherlockState'
import {initRandomConfiguration} from "../service/gameService";
import {DIFFICULTY_EASY} from "../models/gameDifficulties";

const initialState: SherlockState = {
  isRulesOn: true,
  gameState: initRandomConfiguration(DIFFICULTY_EASY),
} 

export default initialState;