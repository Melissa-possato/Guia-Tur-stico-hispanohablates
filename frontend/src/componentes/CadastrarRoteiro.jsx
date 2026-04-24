import { useState } from "react";
import axios from "axios";


function cadastrarRoteiro() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    duracao_horas: "",
    dificuldade: "Fácil",
    preco_estimado: "",
    categoria: "",
    avaliacao: ""
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensagem("");
    setErro("");

    try {
      await axios.post("http://localhost:3000/roteiro", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setMensagem("✅ Roteiro criado com sucesso!");


      setForm({
        titulo: "",
        descricao: "",
        duracao_horas: "",
        dificuldade: "Fácil",
        preco_estimado: "",
        categoria: "",
        avaliacao: ""
      });

    } catch (err) {
      console.error(err);
      setErro("❌ Erro ao criar roteiro");
    }
  };

  return (
    <div className="container-roteiro">
      <h2>Criar Novo Roteiro</h2>

      <form onSubmit={handleSubmit} className="form-roteiro">

        <input
          type="text"
          name="titulo"
          placeholder="Título do roteiro"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
        />

        <input
          type="number"
          name="duracao_horas"
          placeholder="Duração (horas)"
          value={form.duracao_horas}
          onChange={handleChange}
        />

        <select
          name="dificuldade"
          value={form.dificuldade}
          onChange={handleChange}
        >
          <option value="Fácil">Fácil</option>
          <option value="Médio">Médio</option>
          <option value="Difícil">Difícil</option>
        </select>

        <input
          type="number"
          step="0.01"
          name="preco_estimado"
          placeholder="Preço estimado (R$)"
          value={form.preco_estimado}
          onChange={handleChange}
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoria (ex: Cultural, Aventura...)"
          value={form.categoria}
          onChange={handleChange}
        />

        <input
          type="number"
          name="avaliacao"
          placeholder="Avaliação (1 a 5)"
          min="1"
          max="5"
          value={form.avaliacao}
          onChange={handleChange}
        />

        <button type="submit">Criar Roteiro</button>

      </form>

      {mensagem && <p className="sucesso">{mensagem}</p>}
      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}

export default cadastrarRoteiro;