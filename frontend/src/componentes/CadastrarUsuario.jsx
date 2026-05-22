import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../App.css";
import { Link } from "react-router-dom";

function Cadastro() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome_usuario: nomeUsuario,
          email: email,
          senha: senha
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Cuenta creada con éxito!");
        
        navigate("/login"); 
      } else {
        alert("Erro ao cadastrar: " + (data.message || "Verifique os dados."));
      }

    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (

    <div className="login-bg">
  
      <div className="login-container">
  
        <div className="login-card">
  
          <h2>Crear Cuenta</h2>
  
          <p className="login-subtitulo">
            Regístrate para acceder a las funciones del guía turístico.
          </p>
  
          <form onSubmit={handleSubmit} className="login-form">
  
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              required
            />
  
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
  
            <input
              type="password"
              placeholder="Contraseña"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
  
            <button type="submit">
              Crear Cuenta
            </button>
  
          </form>
  
          <p className="cadastro-texto">
            ¿Ya tienes cuenta?
          </p>
  
          <button
            onClick={() => navigate("/login")}
            className="btn-cadastro"
          >
            Iniciar Sesión
          </button>
  
          <Link to="/" className="botao-voltar">
            ← Volver al inicio
          </Link>
  
        </div>
  
      </div>
  
    </div>
  
  );
}

export default Cadastro;
