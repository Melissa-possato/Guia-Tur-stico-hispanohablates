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
      // ATENÇÃO: Mudamos para a porta 3000
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_usuario: nomeUsuario,
          senha: senha,
        }),
      });

      if (!response.ok) {
        alert("Usuário ou senha incorretos.");
        return;
      }

      const data = await response.json();

      if (data.login) {
        alert("Bem-vindo(a)!");
        // Guardamos o ID do usuário para usar nos Roteiros
        localStorage.setItem("usuarioId", data.usuario.id_cadastro);
        navigate("/roteiros"); // Mude para a rota da sua página principal
      } else {
        alert("Falha no login.");
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