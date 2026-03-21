import { useState } from "react";

function Cadastro() {
  console.log("COMPONENTE RENDERIZOU");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");

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
          senha: senha
        })
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        // redireciona (se estiver usando react-router depois a gente melhora isso)
        window.location.href = "/login";
      } else {
        alert("Erro ao cadastrar: " + JSON.stringify(data));
      }

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div>
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
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br /><br />

       <button onClick={handleSubmit}>
          Cadastrar
        </button>
      </form>

      <p>
        Já tem conta? <a href="/login">Fazer login</a>
      </p>
    </div>
  );
}

export default Cadastro;