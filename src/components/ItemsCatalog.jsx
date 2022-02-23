import React from 'react'
import i from "./css/ItemsCatalog.module.css";
import TaskItem from "./TaskItem";

function ItemsCatalog({type, items}) {
  return (
    <div className={i.page}>
      {type === "tasks" && (items && items
      .map((item)=> 
        <a style={{textDecoration: "none", color: "inherit"}} href={`/tareas/${item.id}`} key={item.id}>
          <TaskItem item={item}/>
        </a>
      ))
      }
      {type === "notes" && (true)}
      {type === "articles" && (true)}
      {type === "links" && (true)}
    </div>
  )
}

export default ItemsCatalog;
