import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      const response = await fetch("http://localhost:3000/login", {
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
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Minha Conta</h2>
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", display: "inline-block" }}>
          <p><strong>Usuário:</strong> {usuarioLogado.nome}</p>
          <p>📍 São Carlos, SP</p>
          
          <button 
            onClick={() => navigate("/atualizar-dados")} 
            style={{ marginRight: "10px", padding: "10px", cursor: "pointer" }}
          >
            Atualizar Meus Dados
          </button>

          <button 
            onClick={fazerLogout} 
            style={{ backgroundColor: "#ff4d4d", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Sair da Conta
          </button>
        </div>
        <br /><br />
        <button onClick={() => navigate("/")}>Ir para página inicial</button>
      </div>
    );
  }


  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={fazerLogin}>
        <input 
          type="text" 
          placeholder="Nome de usuário" 
          value={nomeUsuario} 
          onChange={(e) => setNomeUsuario(e.target.value)} 
          required 
        /><br /><br />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required 
        /><br /><br />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem conta? <button onClick={() => navigate("/cadastrarU")}>Cadastre-se</button></p>
      <br />
      <Link to={"/"}> Ir para pagina inicial</Link>
    </div>
  );
}

export default Login;