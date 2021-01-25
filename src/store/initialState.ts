import {SherlockState} from '../models/sherlockState'
import {initRandomConfiguration} from "../service/gameService";
import {DIFFICULTY_EASY, DIFFICULTY_HARD} from "../models/gameDifficulties.d";

const initialState: SherlockState = {
  isRulesOn: false,
  gameState: initRandomConfiguration(DIFFICULTY_EASY),
} 

export default initialState;