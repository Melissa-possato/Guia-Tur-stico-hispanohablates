import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

function Login() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nomeSalvo = localStorage.getItem("nomeUsuario"); 
    if (token && nomeSalvo) {
      setUsuarioLogado({ nome: nomeSalvo });
    }
  }, []);

  const fazerLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_usuario: nomeUsuario, senha: senha }),
      });

      const data = await response.json();

      if (response.ok && data.login) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuarioId", data.usuario.id_cadastro);
        localStorage.setItem("nomeUsuario", nomeUsuario); 
        
        setUsuarioLogado({ nome: nomeUsuario });
        alert(`Bem-vindo, ${nomeUsuario}!`);
        if(alert == true){
          usuarioLogado;
        }; 
      } else {
        alert("Usuário ou senha incorretos.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  const fazerLogout = () => {
    localStorage.clear(); 
    setUsuarioLogado(null);
    navigate("/login");
  };

  if (usuarioLogado) {

    return (
  
      <div className="login-bg">
  
        <div className="conta-container">
  
          <h2>Mi Cuenta</h2>
  
          <div className="conta-card">
  
            <div className="avatar">
              👤
            </div>
  
            <p>
              <strong>Usuario:</strong> {usuarioLogado.nome}
            </p>
  
            <p>📍 São Carlos, SP</p>
  
            <div className="conta-botoes">
  
              <button
                onClick={() => navigate("/update")}
                className="btn-update"
              >
                Actualizar Datos
              </button>
  
              <button
                onClick={fazerLogout}
                className="btn-logout"
              >
                Salir
              </button>
  
            </div>
  
          </div>
  
          <Link to="/" className="botao-voltar">
            ← Volver al inicio
          </Link>
  
        </div>
  
      </div>
  
    );
  }


  return (

    <div className="login-bg">
  
      <div className="login-container">
  
        <div className="login-card">
  
          <h2>Iniciar Sesión</h2>
  
          <p className="login-subtitulo">
            Accede a tu cuenta para explorar São Carlos.
          </p>
  
          <form onSubmit={fazerLogin} className="login-form">
  
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
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
              Entrar
            </button>
  
          </form>
  
          <p className="cadastro-texto">
            ¿No tienes cuenta?
          </p>
  
          <button
            onClick={() => navigate("/cadastrarU")}
            className="btn-cadastro"
          >
            Crear Cuenta
          </button>
  
          <Link to="/" className="botao-voltar">
            ← Volver al inicio
          </Link>
  
        </div>
  
      </div>
  
    </div>
  
  );
}

export default Login;
