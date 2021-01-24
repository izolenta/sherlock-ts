import { GameState } from "./gameState";

export interface SherlockState {
  readonly isRulesOn: boolean,
  readonly gameState: GameState;
}