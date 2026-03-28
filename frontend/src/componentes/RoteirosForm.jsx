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

    // 1. BUSCAMOS OS DADOS REAIS DO USUÁRIO LOGADO
    const token = localStorage.getItem("token");
    const idUsuarioLogado = localStorage.getItem("usuarioId");

    try {
      // 2. CORRIGIMOS A URL PARA A PORTA 3000
      await fetch("http://localhost:3000/roteiro", { 
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // 3. ENVIAMOS O TOKEN NO CABEÇALHO
          "x-access-token": token 
        },
        body: JSON.stringify({
          id_cadastro: idUsuarioLogado, // USANDO O ID REAL DO STORAGE
          titulo,
          descricao,
          duracao_horas: duracao,
          dificuldade,
          preco_estimado: preco,
          categoria,
          avaliacao: 5 
        })
      });

      // Limpa os campos após o sucesso
      setTitulo("");
      setDescricao("");
      setDuracao("");
      setDificuldade("");
      setCategoria("");
      setPreco("");

      atualizar(); // Atualiza a lista na tela principal

    } catch (error) {
      console.error("Erro ao criar roteiro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={criarRoteiro} style={{ marginBottom: "20px", border: "1px solid #eee", padding: "15px" }}>
      <h2>Criar novo roteiro</h2>
      {/* Seus inputs continuam iguais... */}
      <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} /><br/>
      <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} /><br/>
      <input type="number" placeholder="Duração (horas)" value={duracao} onChange={(e) => setDuracao(e.target.value)} /><br/>
      <input type="text" placeholder="Dificuldade" value={dificuldade} onChange={(e) => setDificuldade(e.target.value)} /><br/>
      <input type="text" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} /><br/>
      <input type="text" placeholder="Preço estimado" value={preco} onChange={(e) => setPreco(e.target.value)} /><br/>
      <button type="submit">Criar roteiro</button>
    </form>
  );
}

export default RoteirosForm;