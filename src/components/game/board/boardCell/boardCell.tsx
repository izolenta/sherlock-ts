import React, { Dispatch } from "react";
import { CellState } from "../../../../models/cellState";
import { TAction } from "../../../../store/actions";
import './boardCell.css';
import '../../../../styles/common.css'

interface BoardCellProps {
  state: CellState,
  dispatch: Dispatch<TAction>,
}

export default class BoardCell extends React.Component<BoardCellProps> {

  render() {
    let line = Math.floor(this.props.state.index / 6);
    let position = this.props.state.properSolution;
    let myClass='sprite large resolved s'+ line + position;
    return <div className='cell'>
      <div className={myClass}></div>
    </div>
  }
}
