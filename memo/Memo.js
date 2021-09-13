
import React, {useState, useEffect } from 'react';
import usePersist from '../Persist';

import Item from './Item';

function Memo(props){
  const [memo, setMemo] = usePersist("memo", []);
  const [fmemo, setFMemo] = usePersist("findMemo", []);
  const [mode, setMode] = usePersist('mode', 'default');

  let data = [];
 
  switch (mode){
    case 'default':
      data = memo.map((value, key)=>(
        <Item key={value.message} value={value} index={key + 1} />
      ));
      // テキストの変数名まちがってるっぽい
      setMode('default');
      break;

    case 'find':
      data = fmemo.map((value, key)=>(
        <Item key={value.message} value={value} index={key + 1}/>
      ));
      // findモードにしなくてOK?
      break;
    
    default:
      data = memo.map((value, key) =>(
        <Item key={value.message} value={value} index={key + 1} />
      ));
      break;
  }

  return (
    <table className = "table mt-4">
      <tbody>{data}</tbody>
    </table>
  )
}

export default Memo;