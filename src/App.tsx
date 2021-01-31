import React, { FC, useReducer } from 'react';
import reducer from './store/reducer';
import initialState from './store/initialState';
import Context from './context';
import Layout from './components/layout';

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <Layout />
    </Context.Provider>
  );
};

export default App;
