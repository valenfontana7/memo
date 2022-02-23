import React, {useState} from 'react'
import s from "./css/SearchBar.module.css";
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {listTasks, listPublicTasks} from "../app/actions/tasks_actions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

function SearchBar({type, visible}) {
  const dispatch = useDispatch();
  const showBar = (e,flag) => {
    e.preventDefault();
    if(flag){
      document.getElementById(s.searchbar).style.display = "flex";
      document.getElementById(s.button).style.display = "none";
    } else {
      document.getElementById(s.searchbar).style.display = "none";
      document.getElementById(s.button).style.display = "flex";
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    (type === "tasks" && visible) && dispatch(listPublicTasks());
    (type === "tasks" && !visible) && dispatch(listTasks(localStorage.getItem("tk")));
  }
  const handleFilterSubmit = (e) => {
    (type === "tasks" && visible) && dispatch(listPublicTasks(null,e.target.value));
    (type === "tasks" && !visible) && dispatch(listTasks(localStorage.getItem("tk"),null, e.target.value));
  }
  // const [state, setState] = useState({
  //   keyword: ""
  // })
  const handleInputChange = (e) => {
    e.preventDefault();
    // setState({
    //   ...state,
    //   [e.target.name]: e.target.value
    // })
    (type === "tasks" && visible) && dispatch(listPublicTasks(e.target.value, null));
    (type === "tasks" && !visible) && dispatch(listTasks(localStorage.getItem("tk"),e.target.value, null));
  }
  return (
    <div>
      <button onClick={(e)=>showBar(e,true)} id={s.button} className={s.showButton}><KeyboardArrowDownIcon/></button>
    <div id={s.searchbar}>
      <div className={s.search}>
        <form onSubmit={handleSubmit}>
          <button type="submit" className={s.label}><SearchIcon/></button>
          <input name="keyword" onChange={handleInputChange} className={s.input} type="text"/>
        </form>
      </div>
      <form className={s.filter}>
        <p>Ordenar por:</p>
        <div>
          <input onChange={handleFilterSubmit} type="radio" value="oldest" name="filter" id="oldest"/>
          <label htmlFor="oldest">Más antiguos</label>
        </div>
        <div>
          <input onChange={handleFilterSubmit} type="radio" value="newest" name="filter" id="newest"/>
          <label htmlFor="newest">Más recientes</label>
        </div>
        <div>
          <input onChange={handleFilterSubmit} type="radio" value="all" name="filter" id="all"/>
          <label htmlFor="all">Todos</label>
        </div>
      </form>
      {(localStorage.getItem("tk") && !visible) &&(<div>
        <Link to={{ pathname: "/eliminadas", state: "tasks"}}>Eliminadas</Link>
        <a href="/borradores">Borradores</a>
      </div>)}
      <button onClick={(e)=>showBar(e,false)}><KeyboardArrowDownIcon/></button>
    </div>
    </div>
  )
}

export default SearchBar;
