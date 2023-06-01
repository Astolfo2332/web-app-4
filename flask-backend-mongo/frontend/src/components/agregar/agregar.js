import "./agregar.css"
import { useNavigate } from "react-router-dom"
import { useState ,useEffect} from 'react'
import { uuidv4 } from '../utils/uuid'




function Agregar(){

  const [agregarCarrera, setAgregarCarrera] = useState('')
  const [datosPalabra, setDatosPalabra] = useState([]);
  const [agregarMateria, setAgregarMateria] = useState('')
  const [agregarPalabra, setAgregarPalabra] = useState('')
  const [agregarDescripcion, setAgregarDescripcion] = useState('')
  const [agregarVideo,setAgregarVideo]=useState('')
  const [showError,setShowError]=useState(false)
  const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/Palabras')
          .then((response) => response.json())
          .then((data) => {
            setDatosPalabra(data)
          })
      }, [])

    

    const navigate = useNavigate()
    function volver_menu(){
        navigate("/")  
      }
  function yt(url) {
    var pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([-a-zA-Z0-9_]+)/;
    return pattern.test(url);

    }
      function NuevaPalabra() {
        const nuevaPalbara = {
            id: uuidv4(),
            Descripcion: agregarDescripcion,
            Palabra: agregarPalabra,
            video: agregarVideo,
            Materia: {
              id:uuidv4(),
              Materia: agregarMateria,
              Palabras: [  ]
            },
            Carrera: {
              id: uuidv4(),
              Carrera: agregarCarrera,
              Materias: [
              ]
            },
            Autor: {
              id: uuidv4(),
              Nombre: "Carlos",
              Apellido: "Velasquez",
              Correo: "carlos_velasquez@gmail.com",
              Rol: "Estudiante"
            },
        }
        fetch('http://localhost:3000/Palabras', {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(nuevaPalbara),
          }).then(() => {
              setDatosPalabra([nuevaPalbara, ...datosPalabra])
            })
          }  
    
      function guardarPalabra() {

        if (agregarPalabra !== "" &&
          agregarMateria !== "" &&
            agregarCarrera !== "" && 
             agregarDescripcion !== ""&&  
             agregarVideo !== ""){
        if (yt(agregarVideo)){
            const verificadorPalabra = datosPalabra.find(
                (objetoPalabra) => 
                objetoPalabra.Palabra.toLocaleLowerCase() === agregarPalabra.toLocaleLowerCase() && 
                objetoPalabra.Carrera.Carrera.toLocaleLowerCase() === agregarCarrera.toLocaleLowerCase() && 
                objetoPalabra.Materia.Materia.toLocaleLowerCase() === agregarMateria.toLocaleLowerCase()
              );
              if (!verificadorPalabra){
                NuevaPalabra()
            }
            else{
                displayError("La palabra ya existe en la base de datos")
            }      
          }
          else{
            displayError("Ingrese una url valida")
        }
}
else{
    displayError("Por favor rellene todos los campos")
  }
}

function displayError(mensaje) {
  setErrorMessage(mensaje);
  setShowError(true);
}

      function ErrorPopup(){
        return (
              <div className="error-popup">
                <p>{errorMessage}</p>
                <button className="button" type="button" onClick={()=>setShowError(false)}>OK</button>
              </div>
            );
          } 

    return(
        <div className="form">
            <button className="button" type="button" onClick={volver_menu}>volver menu principal</button>
         <div className="iconos">
        <p> Agregar Carrera: <input type="text" onChange={(e) => setAgregarCarrera(e.target.value)} /></p>
        <p>Agregar Materia: <input type="text" onChange={(e) => setAgregarMateria(e.target.value)} /></p>
         <p>Agregar Palabra: <input type="text" onChange={(e) => setAgregarPalabra(e.target.value)} /></p>
         <p>Agregar Descripcion: <input type="text" onChange={(e) => setAgregarDescripcion(e.target.value)} /></p> 
         <p>Agregar Video: <input type="text" onChange={(e) => setAgregarVideo(e.target.value)} /></p> 
         </div>
        <div>
        <button className="button" type="button" onClick={guardarPalabra}>Guardar</button>
        
        </div>
        <div>{showError && <ErrorPopup/>}</div>
        </div>
    )

}

export default Agregar