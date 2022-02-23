import React, {useState} from 'react'
import l from "./css/Login.module.css";
import axios from "axios";
import AlertMessage from "../components/alertMessage";
import AlertDanger from "../components/alertDanger";
import {CircularProgress} from "@material-ui/core"

function Login() {
  const flag = () => {
    setError("");
  }
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    let usuario = await axios.post("https://memo-app21.herokuapp.com/login", {
      "user": {
        "email": user.email,
        "password": user.password
      }
    }).then((res)=> res.data)
    if(usuario.status === 200){
      setLoading(false);
      setError("");
      setMessage("El usuario se ha logueado exitosamente!");
      localStorage.setItem("tk", usuario.user);
      localStorage.setItem("cif", usuario.id);
      setTimeout(() => window.location = "/", 2500);
      return;
    } else {
      setLoading(false);
      setError("Credenciales incorrectas, intente nuevamente, por favor")
      return;
    }
  }
  return (
    <div className={l.register}>
      <div className={l.alertaerror}>
      {
      error && <AlertDanger speed={120} flag={flag} message={`${error}`} />
      }
      {
      (message && error) ? setError("") && <AlertMessage speed={100} flag={flag} message={`${message}`} /> : (message && !error) && <AlertMessage speed={100} flag={flag} message={`${message}`} />
      }
      </div>
      <div className={l.container}>
      <h1 className={l.brandName}>Memo</h1>
        <form className={l.form} onSubmit={handleSubmit}>
          <div className={l.inputs}>
            <div className={l.formOption}>
              <label htmlFor="email">Email</label>
              <input onChange={handleInputChange} name="email" type="text"/>
            </div>
            <div className={l.formOption}>
              <label htmlFor="password">Contraseña</label>
              <input onChange={handleInputChange} name="password" type="password"/>
            </div>
          </div>
          <button className={l.submitBtn} type="submit">Iniciar Sesión</button>
          {loading && (<CircularProgress style={{color: "turquoise", marginTop: "20px"}} />)}
        </form>
      </div>
    </div>
  )
}

export default Login
