import React, {useEffect} from 'react'
import d from "./css/Deleted.module.css";
import TaskItem from "./TaskItem";
import {useDispatch, useSelector} from "react-redux";
import {listDeletedTasks} from "../app/actions/tasks_actions";

function Deleted({type}) {
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.tasksList);
  const {dtasks, loadingdeletedtasks, errordeletedtasks} = tasksList;
  useEffect(() => {
    (type === "tasks" && !loadingdeletedtasks) && dispatch(listDeletedTasks(localStorage.getItem("tk")));
  }, [])
  return (
    <div className={d.page}>
      {dtasks && dtasks
      .map((item)=> 
        <a style={{textDecoration: "none", color: "inherit"}} href={`/tareas/${item.id}`} key={item.id}>
          <TaskItem item={item}/>
        </a>
      )
      }
      {type === "notes" && (true)}
      {type === "articles" && (true)}
      {type === "links" && (true)}
    </div>
  )
}

export default Deleted;