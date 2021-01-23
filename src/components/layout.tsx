import React, { FC, useContext, useReducer } from 'react';
import Context from '../context';
import './layout.css'
import SherlockRules from './rules/sherlockRules'
import SherlockGame from './game/sherlockGame'

const Layout : FC<{}> = () => {
  const { state } = useContext(Context);
  const control = state.isRulesOn
  ? <SherlockRules></SherlockRules> 
  : <SherlockGame></SherlockGame>
  return (
    <div className='canvas'>
      { control }
    </div>
  );
};

export default Layout;
