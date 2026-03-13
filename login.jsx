import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Se você usar rotas

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  
    const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost:5174/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o token (JWT) ou o estado de logado
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso!");
        // Redirecionar para o mapa: navigate("/mapa");
      } else {
        setErro(data.mensagem || "Erro ao fazer login");
      }
    } catch (err) {
      setErro("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div >
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        
        {erro && <p >{erro}</p>}

        <input 
          type="email" 
          placeholder="E-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit" >Entrar</button>
      </form>
      <br />
    <br />

      <p>Ainda não tem uma conta?</p>
      <br />
      <Link to={"../cadastro"}> Cadastre-se </Link>
      <br /><br />
    <Link to={"/"}>Voltar para a página inicial</Link>
    </div>
  );
}


export default Login;
