import './App.css';
import Start from './components/start/Start'
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from './components/login/login';
import Header from './components/header/header';
import { useEffect, useState } from 'react';
import { AuthContext } from './contexto/authContext';
import Agregar from "./components/agregar/agregar";
import Consulta from "./components/consulta/consulta";
import PalabraDetails from "./components/PalabraDetails/PalabraDetails"

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [user])



  return (
    <AuthContext.Provider value={user}>
      <Header setUser={setUser}></Header>
    <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/Consultar_Palabra" element={<Consulta  />}></Route>
        <Route path="/Agregar_Palabra" element={<Agregar  />}></Route>
        <Route path="Consultar_Palabra/:palabra_id" element={<PalabraDetails />}></Route>
    </Routes>
    </AuthContext.Provider>
  );
}

export default App;
