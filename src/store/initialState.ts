export interface SherlockState {
  message: string,
  isRulesOn: boolean,
}

const initialState: SherlockState = {
  message: "Hey state set",
  isRulesOn: true,
} 

export default initialState;