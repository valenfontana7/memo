import React from 'react';
import {Link} from "react-router-dom";
import h from "./css/Header.module.css";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PublicIcon from '@material-ui/icons/Public';

function Header() {
  return (
    <div className={h.header}>
      <a href="/" className={h.brandName}>Memo</a>
      { !localStorage.getItem("tk") ? (<div className={h.sections}>
        <Link to={{
    pathname: "/posts",
    state: { public: false }
  }} className={h.navOption} href="/posts">Ver publicaciones</Link>
        <a className={h.navOption} href="/signup">Registro</a>
        <a className={h.navOption} href="/login">Iniciar sesión</a>
      </div>) :
      (<div className={h.sections}>
        <Link className={h.logouticon} to={{
    pathname: "/posts",
    state: { public: true }
  }}><PublicIcon/></Link>
        <Link className={h.navOption} to={{
    pathname: "/posts",
    state: { public: false }
  }}>Mis publicaciones</Link>
        <a className={h.navOption} href="/config">Configuraciones</a>
        <a className={h.navOption} href="/profile">Mi perfil</a>
        <button className={h.logout} onClick={()=> {
          localStorage.removeItem("tk");
          localStorage.removeItem("cif");
          window.location = "/login"; 
          }}><ExitToAppIcon style={{fontSize: 27}} className={h.logouticon}/></button>
      </div>)
      }
    </div>
  )
}

export default Header
