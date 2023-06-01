import "./palabra.css"
import { useNavigate } from 'react-router-dom'

function Palabra({Palabra}){
    
const navigate = useNavigate();

function handleClick() {
    navigate(`/Consultar_Palabra/${Palabra.id}`)
    }

return(
<div className="contenedor" key ={Palabra.id}> 
          <div className="ContenedorCursorPalabras" onClick={handleClick}> 
            <h1> {Palabra.Palabra}</h1>
            <h3> <p>Carrera: {Palabra.Carrera.Carrera}</p> <p>Materia: {Palabra.Materia.Materia}</p> </h3>
</div>
</div>
    );
} 
export default Palabra   