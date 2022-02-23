import React from 'react'
import p from "./css/Posts.module.css";
import {Link} from "react-router-dom";

function Posts({e}) {
  return (
    <div className={`posts`}>
      <div className={`container`}>
      {((localStorage.getItem("tk") && (e && e.public)) || !localStorage.getItem("tk")) ? <p className={p.tag}>Público</p> : <p className={p.tag}>Privado</p>}
          {(localStorage.getItem("tk") && (e && !e.public)) ? (<div className={`items`}><Link to={{ pathname: "/tareas", state: { public: false }}} className={`tasks itempost`}>
        </Link>
        <Link to={{ pathname: "/notas", state: { public: false }}} className={`notes itempost`}>
        </Link>
        <Link to={{ pathname: "/articulos", state: { public: false }}} className={`articles itempost`}>
        </Link>
        <Link to={{ pathname: "/enlaces", state: { public: false }}} className={`links itempost`}>
        </Link>
        </div>) : 
        (<div className={`items`}><Link to={{ pathname: "/tareas", state: { public: true }}} className={`tasks itempost`}>
        </Link>
        <Link to={{ pathname: "/notas", state: { public: true }}} className={`notes itempost`}>
        </Link>
        <Link to={{ pathname: "/articulos", state: { public: true }}} className={`articles itempost`}>
        </Link>
        <Link to={{ pathname: "/enlaces", state: { public: true }}} className={`links itempost`}>
        </Link>
        </div>)
        }
      </div>
    </div>
  )
}

export default Posts
