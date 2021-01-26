import React from "react";
import { Dispatch } from "react";
import { CellState } from "../../../models/cellState";
import { SherlockState } from "../../../models/sherlockState";
import BoardCell from './boardCell/boardCell'
import './board.css'
import '../../../styles/common.css'
import {SherlockAction} from "../../../store/types";

interface BoardProps {
  state: SherlockState,
  dispatch: Dispatch<SherlockAction>,
}

export default class Board extends React.Component<BoardProps> {

  render() {
    const states = this.props.state.gameState.boardState.cellStates as Array<CellState>;
    const data = [];
    for (let index = 0; index < states.length; index++) {
      data.push(<BoardCell key={index} state={states[index]} dispatch={this.props.dispatch}></BoardCell>);
    }
    return (
      <div className='board-block'>
        <div className='text-label'>Board</div>
        <div className='board-content'>
          {data}
        </div>
      </div>
    );
  }
}
