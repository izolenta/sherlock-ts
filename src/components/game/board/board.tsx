import React from "react";
import { Dispatch } from "react";
import { CellState } from "../../../models/cellState";
import { SherlockState } from "../../../models/sherlockState";
import { TAction } from "../../../store/actions";
import BoardCell from './boardCell/boardCell'
import './board.css'
import '../../../styles/common.css'

interface BoardProps {
  state: SherlockState,
  dispatch: Dispatch<TAction>,
}

export default class Board extends React.Component<BoardProps> {

  render() {
    const states = this.props.state.gameState.boardState.cellStates as Array<CellState>;
    const data = [];
    for (let index = 0; index < states.length; index++) {
      data.push(<BoardCell key={index} state={states[index]} dispatch={this.props.dispatch}></BoardCell>);
    }
    return (
      <React.Fragment>
        <div className='text-label'>Board</div>
        <div className='board-content'>
          {data}
        </div>
      </React.Fragment>);
  }
}
