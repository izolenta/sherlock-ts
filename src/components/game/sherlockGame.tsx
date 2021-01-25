import { freeSet } from '@coreui/icons';
import { CIcon } from '@coreui/icons-react';
import React, { FC, useContext } from 'react';
import Context from '../../context';
import { GO_TO_SETTINGS } from '../../store/types';
import Board from './board/board';
import HorizontalClues from './horizontalClues/horizontalClues';
import './sherlockGame.css';

const SherlockGame: FC<{}> = () => {
  const context = useContext(Context);

  const goToHelp = function () {
    context.dispatch({ type: GO_TO_SETTINGS });
  }

  return (
    <React.Fragment>
      <div className='top-part'>
        <Board state={context.state} dispatch={context.dispatch}/>
        <HorizontalClues clues={context.state.gameState.clueSet} dispatch={context.dispatch}/>
      </div>
      <CIcon className='icon-right link' content={freeSet.cilSettings} size='3xl' onClick={goToHelp} />
    </React.Fragment>
  );
};

export default SherlockGame;