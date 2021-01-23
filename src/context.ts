import { createContext, Dispatch } from 'react';
import { TAction } from './store/actions';
import initialState, { SherlockState } from './store/initialState';

interface ContextProps {
  state: SherlockState;
  dispatch: Dispatch<TAction>;
}
const Context = createContext<ContextProps>({
  dispatch: () => {
   // Dispatch initial value
  },
   state: initialState
  }
);

export default Context;