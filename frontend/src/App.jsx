import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Guia Cultural</h1>
      

      
      <br />
      <Link to="/mapa">Mapa</Link>
      <br />
      <Link to="/guiacultural">Guia Cultural</Link>
      <br />
      <Link to="/roteiros" >Roteiros</Link>
      <br />
      <Link to="/sobrevivencia">Modo Sobrevivência</Link>
      <br />
      <Link to="/eventos">Eventos</Link>
      <br />
      <Link to="/frases">Frases</Link>
      <br />
      <Link to="/login">Login</Link>

    </>
  )
}

export default App
