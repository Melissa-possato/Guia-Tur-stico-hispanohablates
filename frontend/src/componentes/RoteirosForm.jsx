import { useState } from "react";

function RoteirosForm({ atualizar }) {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [duracao, setDuracao] = useState("");
  const [dificuldade, setDificuldade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");

  const criarRoteiro = async (e) => {
    e.preventDefault();
  
    await fetch("http://localhost:5174/roteiro", { // 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_cadastro: 1, // ADICIONADO: substitua pelo ID do usuário logado futuramente
        titulo,
        descricao,
        duracao_horas: duracao,
        dificuldade,
        preco_estimado: preco,
        categoria,
        avaliacao: 5 // ADICIONADO: valor padrão inicial
      })
    });

    setTitulo("");
    setDescricao("");
    setDuracao("");
    setDificuldade("");
    setCategoria("");
    setPreco("");

    atualizar();

  };

  return (

    <form onSubmit={criarRoteiro}>

      <h2>Criar novo roteiro</h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <br/>

      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <br/>

      <input
        type="number"
        placeholder="Duração (horas)"
        value={duracao}
        onChange={(e) => setDuracao(e.target.value)}
      />

      <br/>

      <input
        type="text"
        placeholder="Dificuldade"
        value={dificuldade}
        onChange={(e) => setDificuldade(e.target.value)}
      />

      <br/>

      <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      <br/>

      <input
        type="text"
        placeholder="Preço estimado"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />

      <br/>

      <button type="submit">Criar roteiro</button>

    </form>

  );

}

export default RoteirosForm;