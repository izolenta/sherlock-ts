import React, { Dispatch } from "react";
import { CellState } from "../../../../models/cellState";
import { TAction } from "../../../../store/actions";
import './boardCell.css';

interface BoardCellProps {
  state: CellState,
  dispatch: Dispatch<TAction>,
}

export default class BoardCell extends React.Component<BoardCellProps> {

  render() {
    return <div className='cell'></div>
  }
}
