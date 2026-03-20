import { useState } from "react";

export default function CadastrarUsuario({ onAdd }) {

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!nome || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    onAdd({
      nome_usuario: nome,
      senha: senha
    });

    setNome("");
    setSenha("");

  };

  return (

    <form onSubmit={handleSubmit}>

      <h3>Criar Conta</h3>

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
        Cadastrar
      </button>

    </form>

  );

}