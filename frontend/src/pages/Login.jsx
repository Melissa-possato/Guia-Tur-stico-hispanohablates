import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

const fazerLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_usuario: nomeUsuario,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok && data.login) {
        alert(`Bem-Vindo(a) ${nomeUsuario}`);
        
        localStorage.setItem("token", data.token); 
        
        localStorage.setItem("usuarioId", data.usuario.id_cadastro);
        
        navigate("/"); 
      } else {
        alert("Falha no login: " + (data.mensagem || "Usuário ou senha incorretos"));
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
      alert("Servidor desligado ou erro na rede.");
    }

  }; 
  
    
  

  return (
    <div style={{ padding: "20px", maxWidth: "300px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={fazerLogin}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
          required
        />
        <button type="submit" style={{ width: "100%" }}>Entrar</button>
      </form>

      <Link to={"/cadastrarU"}> Cadastrar </Link>      <br /><br />
      <Link to={"/"}>Voltar para a página inicial</Link>

    </div>
  );
}

export default Login;