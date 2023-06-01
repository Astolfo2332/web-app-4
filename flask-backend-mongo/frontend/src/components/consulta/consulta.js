import "./consulta.css"
import { FaSearch } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Palabra from "../palabra/palabra.js";
import {embedYouTubeUrl} from "../utils/yt"


function Consulta(){

const [infoPalabra, setInfoPalabra] = useState(null);
const [lisraPalabras, setLisraPalabras] = useState([]);
const [palabraBuscar, setPalabraBuscar] = useState('');
const [showError, setShowError] = useState(false);
const navigate = useNavigate()

useEffect(() => {
  fetch('http://localhost:3000/Palabras')
    .then((response) => response.json())
    .then((data) => {
      setLisraPalabras(data)
    })
}, [])

function volver_menu(){
  navigate("/")  
}



async function buscarPalabra() {
  try{
  const respuesta = await fetch('http://localhost:3000/Palabras');
  const data = await respuesta.json();
  var palabrasEncontradas = data.find(
    (objetoPalabra) => objetoPalabra.Palabra.toLocaleLowerCase() === palabraBuscar.toLocaleLowerCase()
  );  
  if (palabrasEncontradas) {
  setInfoPalabra(palabrasEncontradas)
  setPalabraBuscar("")
  } 
  else {
    setShowError(true)
    setPalabraBuscar("")
  }
  } catch (error){
    console.log("Esperando")
  }
}

function ErrorPopup() {
  return (
    <div className="error-popup">
      <p>No se encontraron palabras que coincidan con la búsqueda.</p>
      <button className="button" type="button" onClick={()=>setShowError(false)}>OK</button>
    </div>
  );
} 



return (
  <div className='consulta'>
    <button className="button" type="button" onClick={volver_menu}>volver menu principal</button>
    <div className="icono">
      <input type="text" value={palabraBuscar} onChange={(e) => setPalabraBuscar(e.target.value)} onKeyDown={(e) => {if (e.key=="Enter") {buscarPalabra()}}} />
      <button className="button"  type="button" onClick={buscarPalabra} > 
        <FaSearch /> Buscar 
     </button>
     </div>
    <div>
      {showError && <ErrorPopup />}
    </div>
    <div className="contenedorTotal">
      {lisraPalabras.map((ObjetoPalabra) => (<Palabra key={ObjetoPalabra.id} Palabra={ObjetoPalabra} />))}
        
    </div>
    {infoPalabra && (
      <div className="info-box">
        <h1>{infoPalabra.Palabra}</h1>
        <p>Carrera: {infoPalabra.Carrera.Carrera}</p>
        <p>Materia: {infoPalabra.Materia.Materia}</p>
        <p>Descripcion: {infoPalabra.Descripcion}</p>
    
        <iframe title="Video" src={embedYouTubeUrl( infoPalabra.video)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <button className="button" onClick={() => setInfoPalabra(null)}>Cerrar</button>
      </div>
    )}
  </div>
);
    }

export default Consulta 