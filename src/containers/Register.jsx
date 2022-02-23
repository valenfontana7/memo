import React, { useState } from 'react'
import r from "./css/Register.module.css"
import axios from "axios";
import AlertDanger from "../components/alertDanger";
import AlertMessage from "../components/alertMessage";
import {CircularProgress} from "@material-ui/core"

function Register() {

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const flag = () => {
    setError("");
  }
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async(e) => {
    e.preventDefault();
    // VALIDACION DE PRESENCIA DE CAMPOS
    if(!user.first_name && !user.last_name && !user.email && !user.password) { setError("Completa los campos requeridos, por favor") ; return}
    if(!user.first_name && !user.last_name && !user.email) { setError("Complete los siguientes campos  --->  Nombre - Apellido - Email") ; return}
    if(!user.last_name && !user.email && !user.password) { setError("Complete los siguientes campos  --->  Apellido - Email - Contraseña") ; return}
    if(!user.first_name && !user.email && !user.password) { setError("Complete los siguientes campos  --->  Nombre - Email - Contraseña") ; return}
    if(!user.first_name && !user.last_name && !user.password) { setError("Complete los siguientes campos  --->  Nombre - Apellido - Contraseña") ; return}
    if(!user.first_name && !user.last_name) { setError("Complete los siguientes campos  --->  Nombre - Apellido") ; return}
    if(!user.first_name && !user.email) { setError("Complete los siguientes campos  --->  Nombre - Email") ; return}
    if(!user.first_name && !user.password) {setError("Complete los siguientes campos  --->  Nombre - Contraseña") ; return}
    if(!user.last_name && !user.email) { setError("Complete los siguientes campos  --->  Apellido - Email") ; return}
    if(!user.last_name && !user.password) { setError("Complete los siguientes campos  --->  Apellido - Contraseña") ; return}
    if(!user.email && !user.password) { setError("Complete los siguientes campos  --->  Email - Contraseña") ; return}
    if(!user.first_name) { setError("Complete el siguiente campo  --->  Nombre") ; return };
    if(!user.last_name) { setError("Complete el siguiente campo  --->  Apellido") ; return };
    if(!user.email) { setError("Complete el siguiente campo  --->  Email") ; return };
    if(!user.password) { setError("Complete el siguiente campo  --->  Contraseña") ; return };
    // VALIDACION DE LARGO DE CAMPOS
    if(user.first_name.length < 3) { setError("El nombre debe tener 3 caracteres como mínimo") ; return };
    if(user.last_name.length < 3) { setError("El apellido debe tener 3 caracteres como mínimo") ; return };
    if(!user.email.match(email_regex)) { setError("Debe ingresar una dirección de mail válida") ; return };
    if(user.password.length < 8) { setError("La contraseña debe tener al menos 8 caracteres") ; return };
    setLoading(true);
    let usuario = await axios.post("https://memo-app21.herokuapp.com/signup", {
      "user": {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "password": user.password
      }
    }).then((res)=> res.data)
    if(usuario.status === 201){
      setLoading(false);
      setError("");
      setMessage("El usuario se ha registrado exitosamente!");
      localStorage.setItem("tk", usuario.user.auth_token);
      setTimeout(() => window.location = "/", 2500);
      return;
    }
  }
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className={r.register}>
      <div className={r.alertaerror}>
      {
      error && <AlertDanger speed={200} flag={flag} message={`${error}`} />
      }
      {
      (message && error) ? setError("") && <AlertMessage speed={100} flag={flag} message={`${message}`} /> : (message && !error) && <AlertMessage speed={100} flag={flag} message={`${message}`} />
      }
      </div>
      <div className={r.container}>
      <h1 className={r.brandName}>Memo</h1>
        <form className={r.form} onSubmit={handleSubmit}>
          <div className={r.inputs}>
            <div className={r.formOption}>
              <label htmlFor="first_name">Nombre/s</label>
              <input onChange={handleInputChange} name="first_name" type="text"/>
            </div>
            <div className={r.formOption}>
              <label htmlFor="last_name">Apellido/s</label>
              <input onChange={handleInputChange} name="last_name" type="text"/>
            </div>
            <div className={r.formOption}>
              <label htmlFor="email">Email</label>
              <input onChange={handleInputChange} name="email" type="text"/>
            </div>
            <div className={r.formOption}>
              <label htmlFor="password">Contraseña</label>
              <input onChange={handleInputChange} name="password" type="password"/>
            </div>
          </div>
          <button className={r.submitBtn} type="submit">Registrarse</button>
          {loading && (<CircularProgress style={{color: "turquoise", marginTop: "20px"}} />)}
        </form>
      </div>
    </div>
  )
}

export default Register
