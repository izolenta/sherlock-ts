import { createContext, Dispatch } from 'react';
import { SherlockState } from './models/sherlockState';
import { TAction } from './store/actions';
import initialState from './store/initialState';

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