import React, { Dispatch } from "react";
import { CellState } from "../../../../models/cellState";
import './boardCell.css';
import '../../../../styles/common.css'
import {SherlockAction} from "../../../../store/types";

interface BoardCellProps {
  state: CellState,
  dispatch: Dispatch<SherlockAction>,
}

export default class BoardCell extends React.Component<BoardCellProps> {

  render() {
    let state = this.props.state;
    let line = Math.floor(state.index / 6);
    if (state.isSolved()) {
      let position = this.props.state.getCurrentSolution();
      let myClass='sprite large resolved s'+ line + position;
      return <div className='cell'>
        <div className={myClass}></div>
      </div>
    }
    else {
      let cells = [];
      for (let i=0; i<6; i++) {
        if (state.hasPossibleItem(i)) {
          let myClass='sprite unresolved s'+ line + i;
          cells.push(<div className={myClass}/>)
        }
        else {
          cells.push(<div className='sprite unresolved empty'/>)
        }
      }
      return<div className='cell stack'>
        {cells}
      </div>
    }
  }
}
