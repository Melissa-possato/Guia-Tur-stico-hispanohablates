import { useState } from "react";

export default function LoginUsuario({ onLogin }) {

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!nome || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    onLogin({
      nome_usuario: nome,
      senha: senha
    });

  };

  return (

    <form onSubmit={handleSubmit}>

      <h3>Login</h3>

      <input
        type="text"
        placeholder="Nome do usuário"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button type="submit">
        Entrar
      </button>

    </form>

  );

}