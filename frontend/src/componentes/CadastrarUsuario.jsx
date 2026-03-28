import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Cadastro() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/cadastro", {
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
        alert("Usuário cadastrado com sucesso!");
        
        navigate("/login"); 
      } else {
        alert("Erro ao cadastrar: " + (data.message || "Verifique os dados."));
      }

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro de Usuário</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br /><br />

        {/* Removido o onClick daqui, o onSubmit do form já resolve */}
        <button type="submit">
          Cadastrar
        </button>
      </form>

      <p>
        Já tem conta? <button onClick={() => navigate("/login")} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>Fazer login</button>
      </p>
    </div>
  );
}

export default Cadastro;