import { FC, useContext } from "react";
import Context from '../../context';

const SherlockGame  : FC<{}> = () => {
  const { state, dispatch } = useContext(Context);
  return (
    <div>
      GAME!!
    </div>
  );
};

export default SherlockGame;