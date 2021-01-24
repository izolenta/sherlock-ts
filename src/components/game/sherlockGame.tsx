import { freeSet } from "@coreui/icons";
import { CIcon } from "@coreui/icons-react";
import React, { FC, useContext } from "react";
import Context from '../../context';
import { GO_TO_SETTINGS } from "../../store/types";
import Board from "./board/board";

const SherlockGame  : FC<{}> = () => {
  const context = useContext(Context);

  const goToHelp = function() {
    context.dispatch({type: GO_TO_SETTINGS});
  }

  return (
    <div>
      <Board state={context.state} dispatch={context.dispatch}></Board>
      <CIcon className='icon-right link' content={freeSet.cilSettings}size="3xl" onClick={goToHelp}/>    
    </div>
  );
};

export default SherlockGame;