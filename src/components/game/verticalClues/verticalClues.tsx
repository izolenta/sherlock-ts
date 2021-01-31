import React, {Dispatch} from 'react';
import {GenericClue} from '../../../models/clues/genericClue';
import {ClueItem} from '../../../models/clues/clueItem';
import './verticalClues.css';
import '../../../styles/common.css';

import crossImg from '../../../img/cross.png';
import {TwoInSameColumnClue} from "../../../models/clues/twoInSameColumnClue";
import {TwoNotInSameColumnClue} from "../../../models/clues/twoNotInSameColumnClue";
import {SherlockAction, USE_CLUE} from "../../../store/types";
import {generateUniqueID} from "web-vitals/dist/lib/generateUniqueID";

interface ClueProps {
  clues: GenericClue[],
  dispatch: Dispatch<SherlockAction>,
}

export default class VerticalClues extends React.Component<ClueProps> {

  isTwoCellClue(clue: GenericClue) {
    return clue instanceof TwoInSameColumnClue
      || clue instanceof TwoNotInSameColumnClue;
  }

  getFirstItem(clue: GenericClue): ClueItem {
    return clue.items[0];
  }

  getSecondItem(clue: GenericClue): ClueItem {
    return clue.items[1];
  }

  getFirstSpriteClass(clue:GenericClue): string {
    const firstItem = this.getFirstItem(clue);
    return firstItem ? `s${firstItem.line}${firstItem.item}` : 'empty';
  }

  getSecondSpriteClass(clue: GenericClue): string {
    const secondItem = this.getSecondItem(clue);
    return secondItem? `s${secondItem.line}${secondItem.item}` : 'empty';
  }

  needToDisplayCross(clue: GenericClue): boolean {
    return clue instanceof TwoNotInSameColumnClue;
  }

  getSpriteClass(clue: GenericClue, id: number) {
    switch (id) {
      case 0:
        return 'sprite clue middle layout-cell padded '+this.getFirstSpriteClass(clue);
      case 1:
        return 'sprite clue middle layout-cell padded '+this.getSecondSpriteClass(clue);
      default:
        throw new RangeError('wrong sprite')
    }
  }

  render() {
    const clues = this.props.clues;
    const data = [];

    console.log(clues.length);

    for (let clue of clues) {
      if (this.isTwoCellClue(clue)) {
        const node = [];
        node.push(<div className={this.getSpriteClass(clue, 0)} key={generateUniqueID()}/>);
        node.push(<div className={this.getSpriteClass(clue, 1)} key={generateUniqueID()}/>);
        if (this.needToDisplayCross(clue)) {
          node.push(<img src={crossImg} alt='cross' className='cross' key={generateUniqueID()}/>);
        }
        const style = clue.isUsed? 'vertical-clue used' : 'vertical-clue';
        data.push(
          <div className={style}  key={generateUniqueID()} onContextMenu={(event) => this.reverseUsed(clue, event)}>
            {node}
          </div>
        );
      }
    }
    return (
      <div className='clues-block'>
        <div className='text-label'>Clues</div>
        <div className='vertical-clue-content'>
          {data}
        </div>
      </div>
    );
  }

  private reverseUsed(clue: GenericClue, event: React.MouseEvent) {
    this.props.dispatch({type: USE_CLUE, payload: clue});
    event.preventDefault();
  }
}
