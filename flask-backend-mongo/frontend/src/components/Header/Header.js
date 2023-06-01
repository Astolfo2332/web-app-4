import { useContext } from "react";
import { AuthContext } from "../../contexto/authContext";
import "./header.css"


function Header({ setUser }) {

  const user = useContext(AuthContext)
  const logoOscuro=require("../logos/logoOscuro.PNG")
  function logout() {
    setUser(null);
    localStorage.removeItem('user')
  }

  return (

    <header className="header-form">
      <img className="element" src={logoOscuro} alt="LdeSA" ></img>
      {user ? <button className='bt' type="button" onClick={logout}>logout</button> : null}
    </header>
  )
}

export default Header;