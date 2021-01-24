import React, { FC, useContext } from 'react';
import Context from '../context';
import './layout.css'
import SherlockRules from './rules/sherlockRules'
import SherlockGame from './game/sherlockGame'

const Layout : FC<{}> = () => {
  const context = useContext(Context);
  const control = context.state.isRulesOn
  ? <SherlockRules></SherlockRules> 
  : <SherlockGame></SherlockGame>
  return (
    <div className='canvas'>
      { control }
    </div>
  );
};

export default Layout;
