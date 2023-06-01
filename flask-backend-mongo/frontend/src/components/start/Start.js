import "./Start.css"
import { useNavigate } from 'react-router-dom'
function Start() {
    const navigate = useNavigate();
    function Consultar() {
        navigate("/Consultar_Palabra")
      }
      function Agregar() {
        navigate("/Agregar_Palabra")
      }
    const IconoOscuro=require("../logos/iconoOscuro.PNG")
    return(
    <div className='start'>
        <button className="start button" type="button"onClick={Agregar}>Agregar palabra</button>
        <button className="start button" type="button" onClick={Consultar}>Consultar palabra</button>
        <img src={IconoOscuro} alt="LdeSA" className="start image"></img>
    </div>
    );
}
export default Start
