import React, {Dispatch} from 'react';
import {TAction} from '../../../store/actions';
import {GenericClue} from '../../../models/clues/genericClue';
import {OneShouldBeBeforeOtherClue} from '../../../models/clues/oneShouldBeBeforeOtherClue';
import {ThreeAdjacentClue} from '../../../models/clues/threeAdjacentClue';
import {TwoAdjacentClue} from '../../../models/clues/twoAdjacentClue';
import {ClueItem} from '../../../models/clues/clueItem';
import './horizontalClues.css';

import crossImg from '../../../img/cross.png';
import dotsImg from '../../../img/dots.png';
import arrows2x2 from '../../../img/arrows-2x2.png';
import arrows3x2 from '../../../img/arrows-3x2.png';


interface ClueProps {
  clues: GenericClue[],
  dispatch: Dispatch<TAction>,
}

export default class HorizontalClues extends React.Component<ClueProps> {

  isThreeCellClue(clue: GenericClue) {
    return clue instanceof OneShouldBeBeforeOtherClue || clue instanceof ThreeAdjacentClue || clue instanceof TwoAdjacentClue;
  }

  getFirstItem(clue:GenericClue): ClueItem | undefined {
    if (clue instanceof ThreeAdjacentClue) {
      return (clue as ThreeAdjacentClue).items[0];
    }
    if (clue instanceof TwoAdjacentClue) {
      return (clue as TwoAdjacentClue).items[0];
    }
    if (clue instanceof OneShouldBeBeforeOtherClue) {
      return (clue as OneShouldBeBeforeOtherClue).items[0];
    }
    // if (clue instanceof TwoNotAdjacentClue) {
    //   return (clue as TwoNotAdjacentClue).first;
    // }
    // if (clue instanceof TwoWithNoThirdAtCenterClue) {
    //   return (clue as TwoWithNoThirdAtCenterClue).first;
    // }
    return undefined;
  }

  getSecondItem(clue:GenericClue): ClueItem | undefined {
    if (clue instanceof ThreeAdjacentClue) {
      return (clue as ThreeAdjacentClue).items[1];
    }
    if (clue instanceof TwoAdjacentClue) {
      return undefined;
    }
    if (clue instanceof OneShouldBeBeforeOtherClue) {
      return (clue as OneShouldBeBeforeOtherClue).items[1];
    }
    // if (clue instanceof TwoNotAdjacentClue) {
    //   return null;
    // }
    // if (clue instanceof TwoWithNoThirdAtCenterClue) {
    //   return (clue as TwoWithNoThirdAtCenterClue).second;
    // }
    return undefined;
  }

  getThirdItem(clue:GenericClue): ClueItem | undefined {
    if (clue instanceof ThreeAdjacentClue) {
      return (clue as ThreeAdjacentClue).items[2];
    }
    if (clue instanceof TwoAdjacentClue) {
      return (clue as TwoAdjacentClue).items[1];
    }
    if (clue instanceof OneShouldBeBeforeOtherClue) {
      return undefined;
    }
    // if (clue instanceof TwoNotAdjacentClue) {
    //   return (clue as TwoNotAdjacentClue).second;
    // }
    // if (clue instanceof TwoWithNoThirdAtCenterClue) {
    //   return (clue as TwoWithNoThirdAtCenterClue).third;
    // }
    return undefined;
  }

  getFirstSpriteClass(clue:GenericClue): string {
    const firstItem = this.getFirstItem(clue);
    return firstItem ? `s${firstItem.line}${firstItem.item}` : 'empty';
  }

  getSecondSpriteClass(clue: GenericClue): string {
    const secondItem = this.getSecondItem(clue);
    return secondItem? `s${secondItem.line}${secondItem.item}` : 'empty';
  }

  getThirdSpriteClass(clue: GenericClue): string {
    const thirdItem = this.getThirdItem(clue);
    return thirdItem? `s${thirdItem.line}${thirdItem.item}` : 'empty';
  }

  needToDisplayCross(clue: GenericClue): boolean {
    //return clue instanceof TwoWithNoThirdAtCenterClue || clue instanceof TwoNotAdjacentClue;
    return false;
  }

  needToDisplayArrows3(clue: GenericClue): boolean {
    return clue instanceof ThreeAdjacentClue;// || clue is TwoWithNoThirdAtCenterClue;
  }

  needToDisplayArrows2(clue: GenericClue): boolean {
    return clue instanceof TwoAdjacentClue; //|| clue instanceof TwoNotAdjacentClue;
  }

  needToDisplayDots(clue: GenericClue): boolean {
    return clue instanceof OneShouldBeBeforeOtherClue;
  }

  getSpriteClass(clue: GenericClue, id: number) {
    switch (id) {
      case 0:
        return 'sprite clue middle layout-cell '+this.getFirstSpriteClass(clue);
      case 1:
        return 'sprite clue middle layout-cell '+this.getSecondSpriteClass(clue);
      case 2:
        return 'sprite clue middle layout-cell '+this.getThirdSpriteClass(clue);
      default:
        throw new RangeError('wrong sprite')
    }
  }

  render() {
    const clues = this.props.clues;
    const data = [];


    for (let clue of clues) {
      if (this.isThreeCellClue(clue)) {
        const node = [];
        node.push(<div className={this.getSpriteClass(clue, 0)}/>);
        node.push(<div className={this.getSpriteClass(clue, 2)}/>);
        node.push(<div className={this.getSpriteClass(clue, 1)}/>);
        if (this.needToDisplayCross(clue)) {
          node.push(<img src={crossImg} alt='cross'/>);
        }
        if (this.needToDisplayDots(clue)) {
          node.push(<img src={dotsImg} alt='dots' className='dots'/>);
        }
        if (this.needToDisplayArrows3(clue)) {
          node.push(<img src={arrows3x2} alt='arrows3x2' className='arrow3'/>);
        }
        if (this.needToDisplayArrows2(clue)) {
          node.push(<img src={arrows2x2} alt='arrows2x2'  className='arrow2'/>);
        }
        data.push(
          <div className='horizontal-clue'>
            {node}
          </div>
        );
      }
    }
    return (
      <div className='clues-block'>
        <div className='text-label'>Clues</div>
        <div className='clue-content'>
          {data}
        </div>
      </div>
    );
  }
}