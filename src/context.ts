import { createContext, Dispatch } from 'react';
import { SherlockState } from './models/sherlockState';
import initialState from './store/initialState';
import {SherlockAction} from "./store/types";

interface ContextProps {
  state: SherlockState;
  dispatch: Dispatch<SherlockAction>;
}
const Context = createContext<ContextProps>({
  dispatch: () => {
   // Dispatch initial value
  },
   state: initialState
  }
);

export default Context;