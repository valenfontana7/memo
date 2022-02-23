import React from 'react';
import o from "./css/OwnersList.module.css";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

function OwnersList({data}) {
  const userId = localStorage.getItem("tk") && Number(localStorage.getItem("cif"));
  return (
    <div className={o.component}>
      <div className={o.container}>
        <div className={o.searchow}>
          <button type="submit" className={o.label}><SearchIcon/></button>
          <input name="keyword" className={o.input} type="text"/>
          <button><AddIcon/></button>
        </div>
        <div className={o.listow}>
          {data && data.map((owner)=> <div className={o.owner}><p>{owner.first_name + " " + owner.last_name}{(owner.id === userId) && " (yo)"}</p>{(owner.id !== userId) && (<button><DeleteIcon/></button>)}</div>)}
        </div>
      </div>
    </div>
  )
}

export default OwnersList;
