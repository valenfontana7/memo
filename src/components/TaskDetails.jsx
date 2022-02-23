import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"; 
import t from "./css/TaskDetails.module.css";
import {taskDetails, editTask} from "../app/actions/tasks_actions";
import {CircularProgress} from "@material-ui/core";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import OwnersList from "../containers/OwnersList";
import TaskData from "./TaskData.jsx";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function TaskDetails({params}) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("tk") && Number(localStorage.getItem("cif"));
  const tasksList = useSelector((state)=> state.tasksList);
  const {task, loadingtask, errortask} = tasksList;
  const [tarea, setTarea] = useState({});
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    dispatch(taskDetails(params));
  }, [])
  const handleDelete = (e) => {
    const taskDeleted = {...task, status: "deleted"};
    e.preventDefault();
    if(task.owners.find((ow) => ow.id === userId)) {
      dispatch(editTask(taskDeleted, localStorage.getItem("tk")));
    }
  }
  const handleClickAway = () => {
    if(document.getElementById("contenthidden")) {
      document.getElementById("contenthidden").style.display = "none"
    }; 
    if(document.getElementById("btnhidden")) {
      document.getElementById("btnhidden").style.display = "none"
    };
    if(document.getElementById("content")) {
      document.getElementById("content").style.display = "flex";
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    setOpen(true);
    setTarea(task);
    if(document.getElementById("contenthidden")) {
      document.getElementById("contenthidden").style.display = "flex"
    }; 
    if(document.getElementById("btnhidden")) {
      document.getElementById("btnhidden").style.display = "flex"
    }; 
    if(document.getElementById("content")) {
      document.getElementById("content").style.display = "none";
    }
}
  const handleInputChange = (e) => {
    e.preventDefault();
    setTarea({...tarea, content: e.target.value});
  }
  const handleSubmit = () => {
    if((tarea.content !== task.content) && open) {
      dispatch(editTask(tarea, localStorage.getItem("tk")));
    }
  }
  return (!loadingtask && task) ? (
    <div className={t.page}>
      <a className={t.back} href="/tareas"><ArrowBackIcon/></a>
      <div className={t.container}>


        {task.owners && task.owners.find((user)=> Number(localStorage.getItem("cif")) === user.id) ? 
          (<ClickAwayListener onClickAway={handleClickAway}>
            <div className={t.contentedit}>
              <span id="content" onClick={handleClick} className={t.content}>{task.content}</span>
              <textarea rows="2" cols="65" maxLength="85" style={{display: "none"}} onChange={handleInputChange} id="contenthidden" className={t.content} value={tarea.content} type="text"/>
              <button onClick={handleSubmit} style={{display: "none"}} className={t.editbutton} id="btnhidden"><EditIcon/></button>
            </div>
          </ClickAwayListener>) : 
          (<span id="content" className={t.content}>{task.content}</span>)
        }
      
      <div className={t.data}>
        <div className={t.buttons}>
          <button onClick={handleDelete} className={t.boton}><DeleteIcon/></button>
        </div>
      <TaskData data={task}/>
      <OwnersList data={task.owners}/>
      </div>


      </div>
    </div>
  ) : (<CircularProgress style={{color: "turquoise", width: "70px", marginTop: "100px"}} />)
}

export default TaskDetails
