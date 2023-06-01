import { useState } from "react";
import "./login.css"

const user = {
  id: '123',
  email: 'test@mail.com',
  password: '123456'
}

function Login({ setUser }) {
  const IconoOscuro=require("../logos/iconoOscuro.PNG")
  const [email, setEmail] = useState()
  const [password, setPasword] = useState()

  


  function login() {
    if (email === user.email && password === user.password) {

      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  return (
    <div className="login-form form">
        <img src={IconoOscuro} alt="LdeSA"></img>
      <div className="login-form box">
      <h1 >Qué es LdeSA?</h1> 
      <p>
        Es un aplicativo que contiene un glosario sobre las diferentes señas utilizadas en diversas materias de programas ofrecidos por la Universidad de Antioquia, con el objetivo de sistematizar la lengua de señas académico colombiano para los estudiantes pertenecientes a la comunidad sordo-señante.
      </p>
      <p>
        El estudiante podrá cargar un GIF realizando la seña de esa palabra en específica, junto con una pequeña descripción de su significado. El contenido podría ser compartido por los usuarios mediante este aplicativo.
      </p>
      </div>
      <label  >Email</label>
      <input  className=" login-form input" type="email" onChange={(e) => setEmail(e.target.value)} />
      <label  >Password</label>
      <input  className=" login-form input" type="password" onChange={(e) => setPasword(e.target.value)} />
      <button className="login-form button" type="button" onClick={login}>Login</button>
    </div>
  )
}

export default Login;
