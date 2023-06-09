import React, {FC, useContext} from 'react';
import Context from '../../context';
import Board from './board/board';
import HorizontalClues from './horizontalClues/horizontalClues';
import VerticalClues from "./verticalClues/verticalClues";
import {CYCLE_DIFFICULTY, GO_TO_LAST_CORRECT, GO_TO_SETTINGS, START_NEW_GAME, UNDO} from '../../store/types';
import './sherlockGame.css';
import {DIFFICULTY_EASY, DIFFICULTY_HARD, DIFFICULTY_MEDIUM} from '../../models/gameDifficulties.d';
import { useState } from 'react'
import {CiSettings} from 'react-icons/ci';

const SherlockGame: FC = () => {

  const lastCorrectText = 'Go to Last Correct position';
  const [label, updateLabel] = useState(lastCorrectText);

  const context = useContext(Context);

  const goToHelp = function () {
    context.dispatch({ type: GO_TO_SETTINGS });
  }

  const goToLastCorrect = function () {
    if (!context.state.gameState.boardState.isStillCorrect()) {
      context.dispatch({ type: GO_TO_LAST_CORRECT });
    }
    else {
      updateLabel('You still doing OK!');
       setTimeout(() => {
         updateLabel(lastCorrectText);
       }, 1500);
    }
  }

  const undoMove = function () {
    context.dispatch({ type: UNDO });
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
        <button className='bottom-button' onClick={undoMove} disabled={context.state.gameState.prevStates.length === 0}>
          Undo step
        </button>
        <button className='bottom-button' onClick={goToLastCorrect}>
          {label}
        </button>
      </div>
      <CiSettings className='icon-right link' onClick={goToHelp} />
    </React.Fragment>
  );
};

export default SherlockGame;