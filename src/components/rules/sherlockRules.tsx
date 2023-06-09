import {BsArrowRightCircle} from 'react-icons/bs';
import React, { FC, useContext } from 'react';
import Context from '../../context';
import './sherlockRules.css'
import { GO_TO_GAME } from '../../store/types';

const SherlockRules : FC<{}> = () => {
  const { dispatch } = useContext(Context);

  const goToGame = function() {
    dispatch({type: GO_TO_GAME});
  }

  return (
    <div>
      <div className='block1'>
        &laquo;...Sherlock is a computerized version of logic puzzles, where you're presented with a series of clues that help you to determine the exact locations of all of the images on the playing board. Each row of the playing board contains images of the same type (faces, houses, numbers, fruit, street signs, letters, etc). The computer scrambles the locations of the items in each row (without showing you their locations) and then presents to you a set of graphical clues that describe the positional relationships of different images. You use the clues to deduce where things can't be (and where they HAVE to be) until you know where all of the images are located.&raquo; <span className='nowrap'>&copy; <a href='http://www.kaser.com/sherwin.html'>Everett Kaser</a></span>
      </div>
      <div className='block2'>
        This game has been created under the inspiration of the old-school Sherlock game, originally written by Everett Kaser more than 20 years ago.
      </div>
      <div className='block2'>
        I've enjoyed it so much in my college years, and hope you'll enjoy it too ¯\_(ツ)_/¯
      </div>
      <div className='block3'>What you need to know:</div>
      <div className='block4'>- You have a 6x6 game board and two panels with clues that help you to solve the puzzle. Some cells on the board are opened initially, and your goal is to use already opened cells along with clues to determine correct position for each item on the board.</div>
      <div className='block4'>- Right click on the item on board removes it from the cell. Use it if you concluded that the item cannot be in this position.</div>
      <div className='block4'>- Left click on the item on board puts it as solution on the cell. Use it if you concluded that the item have to be in this position.</div>
      <div className='block4'>- Move your mouse over the clue if you do not understand what this clue means. There will be a tooltip with the detailed info about this clue.</div>
      <div className='block4'>- If you believe that some clue is not needed anymore, you can hide it by right-clicking. That is useful to not to be distracted by already used clues.</div>
      <div className='block4'>- If you realize that your solution process is going wrong, you can press 'Undo to Last Correct' to return to last known correct position and continue from there.</div>
      <div className='block4'>- You can try Medium and even Hard difficulty levels if you believe that Easy is too easy for you!</div>
      <div className='block4'>- This page can be opened any time by pressing help button in bottom-right corner. Your game won't be interrupted.</div>
      <div className='block5'><button className='link pseudo' onClick={goToGame}>Start (or continue) your game!</button></div>
      <div className='block3'>Credits:</div>
      <div className='block6'>Idea: <a href='http://www.kaser.com/sherwin.html' className='link' target='_blank' rel='noreferrer'>Everett Kaser</a></div>
      <div className='block6'>Pictures: <a href='https://emojione.com/' className='link' target='_blank' rel='noreferrer'>Emojione v3.0</a></div>
      <div className='block6'>
        Sounds: <a className='link' href='https://www.freesound.org/people/GabrielAraujo/sounds/242501/' target='_blank' rel='noreferrer'>GabrielAraujo</a>, <a className='link' href='https://www.freesound.org/people/fins/sounds/171670/' target='_blank' rel='noreferrer'>fins</a>  and <a className='link' href='https://www.freesound.org/people/Porphyr/sounds/191678/' target='_blank' rel='noreferrer'>Porphyr</a>
      </div>
      <div className='block6'>&nbsp;</div>
      <div className='block6'>
        Coding: &copy; <a className='link' href='https://github.com/izolenta' target='_blank' rel='noreferrer'>Izolenta</a> especially for AngularAttack 2017, rewritten from Dart/Angular to TS/React in 2021
      </div>
      
      <BsArrowRightCircle className='icon-right link' onClick={goToGame}/>
    </div>
  );
};

export default SherlockRules;