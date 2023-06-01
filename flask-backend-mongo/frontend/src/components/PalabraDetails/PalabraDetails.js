import "./palabrasDetails.css"
import {embedYouTubeUrl} from "../utils/yt"
import { useNavigate,useParams } from "react-router-dom"
import { useState, useEffect } from 'react';


function PalabraDetails() {
    const navigate = useNavigate()
    const { palabra_id } = useParams();
    console.log(palabra_id)    
    
    function volver_menu(){
      navigate("/Consultar_Palabra")  
    }
    const [infoPalabra, setInfoPalabra] = useState(null);
    useEffect(() => {
    async function idpalabra(){
      const respuesta = await fetch(`http://localhost:3000/Palabras/${palabra_id}`);
      const data = await respuesta.json();
      console.log(data);
      setInfoPalabra(data);
      }
    idpalabra();
  },[palabra_id]);
  
  if (!infoPalabra) {
    return <div>
       <button className="button" type="button" onClick={volver_menu}>volver menu de consulta</button>
      Loading...
      </div>;
  }
    return (
      <div className="info-box">
        <button className="button" type="button" onClick={volver_menu}>volver menu de consulta</button>
        <h1>{infoPalabra.Palabra}</h1>
        <p>Carrera: {infoPalabra.Carrera.Carrera}</p>
        <p>Materia: {infoPalabra.Materia.Materia}</p>
        <p>Descripcion: {infoPalabra.Descripcion}</p>
        <iframe title="Video" src={embedYouTubeUrl(infoPalabra.video)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    );
    
  }
  
  export default PalabraDetails