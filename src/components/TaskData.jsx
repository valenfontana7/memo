import React from 'react'
import t from "./css/TaskData.module.css";
import moment from "moment";

function TaskData({data}) {
  return (
    <div className={t.component}>
      <div className={t.container}>
        <h4>Fecha de creación: {moment(data.created_at).fromNow()}</h4>
        <h4>Última modificación: {moment(data.updated_at).fromNow()}</h4>
        <h4>Visibilidad: {
        data.visibility === "public" ? "Pública" : 
        data.visibility === "private" && "Privada"
        }</h4>
      </div>
    </div>
  )
}

export default TaskData
