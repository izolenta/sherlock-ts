import React, {FC, useContext} from 'react';
import Context from '../../context';
import Board from './board/board';
import HorizontalClues from './horizontalClues/horizontalClues';
import VerticalClues from "./verticalClues/verticalClues";
import {freeSet} from '@coreui/icons';
import {CIcon} from '@coreui/icons-react';
import {CYCLE_DIFFICULTY, GO_TO_SETTINGS, START_NEW_GAME} from '../../store/types';
import './sherlockGame.css';
import {DIFFICULTY_EASY, DIFFICULTY_HARD, DIFFICULTY_MEDIUM} from "../../models/gameDifficulties.d";

const SherlockGame: FC = () => {
  const context = useContext(Context);

  const goToHelp = function () {
    context.dispatch({ type: GO_TO_SETTINGS });
  }

  const startNewGame = function () {
    context.dispatch({ type: START_NEW_GAME });
  }

  const cycleDifficulty = function () {
    context.dispatch({ type: CYCLE_DIFFICULTY });
  }

  const getDiffString = function(): String {
    switch(context.state.gameState.difficulty) {
      case DIFFICULTY_EASY:
        return 'Easy';
      case DIFFICULTY_MEDIUM:
        return 'Medium';
      case DIFFICULTY_HARD:
        return 'Hard';
      default:
        return 'Broken';
    }
  }

  return (
    <React.Fragment>
      <div className='top-part'>
        <Board state={context.state} dispatch={context.dispatch}/>
        <HorizontalClues clues={context.state.gameState.clueSet} dispatch={context.dispatch}/>
      </div>
      <div className='bottom-part'>
        <VerticalClues clues={context.state.gameState.clueSet} dispatch={context.dispatch}/>
      </div>
      <div className='buttons'>
        <button className='bottom-button' onClick={startNewGame}>Start New Game</button>
        <button className='bottom-button' onClick={cycleDifficulty}>Difficulty: {getDiffString()}</button>
      </div>
      <CIcon className='icon-right link' content={freeSet.cilSettings} size='3xl' onClick={goToHelp} />
    </React.Fragment>
  );
};

export default SherlockGame;