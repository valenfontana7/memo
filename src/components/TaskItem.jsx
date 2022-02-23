import React from 'react'
import t from "./css/TaskItem.module.css";
import moment from "moment";

function TaskItem({item}) {
  const randColor = () => {
    let num = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    const colors = {
      1: "salmon",
      2: "plum",
      3: "lightsteelblue",
      4: "orange",
      5: "grey",
      6: "lightblue"
    }
    return colors[num];
  }
  return (
    <div className={t.card}>
      <p className={t.content}>{item.content.length > 85 ? item.content.slice(0,85) : item.content}</p>
      <div className={t.owners}>
        {item.owners.length > 3 ? [...item.owners.slice(0,3), {"id": 4, "first_name": "...", "last_name": ""}].map((ow)=> ow.id !== 4 ? <a key={ow.id} href={`/users/${ow.id}`} style={{background: randColor(), textDecoration: "none"}} className={t.owner}>{ow.first_name+" "+ow.last_name+" "}</a> : <a key={ow.id} href={`/tareas/${item.id}`} style={{background: randColor(), textDecoration: "none"}} className={t.owner}>{ow.first_name+" "+ow.last_name+" "}</a>) : item.owners.map((ow)=><a key={ow.id} href={`/users/${ow.id}`} style={{background: randColor(), textDecoration: "none"}} className={t.owner}>{ow.first_name+" "+ow.last_name+" "}</a>)}
      </div>
      <div className={t.timestamps}>
        <p>Creada {":"} {moment(item.created_at).fromNow()}</p>
        <p>Última actualización {":"} {moment(item.updated_at).fromNow()}</p>
      </div>
    </div>
  )
}

export default TaskItem
