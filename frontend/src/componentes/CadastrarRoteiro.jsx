import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

function CadastrarRoteiro() {
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
      await axios.post("http://localhost:5000/cadastrarRoteiro", form, {
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

    <div className="criar-roteiro-bg">
  
      <div className="criar-roteiro-container">
  
        <div className="criar-header">
  
          <h1>Crear Nueva Ruta</h1>
  
          <p>
            Comparte experiencias increíbles en São Carlos.
          </p>
  
        </div>
  
        <div className="criar-card">
  
          <form
            onSubmit={handleSubmit}
            className="form-roteiro"
          >
  
            <input
              type="text"
              name="titulo"
              placeholder="Título de la ruta"
              value={form.titulo}
              onChange={handleChange}
              required
            />
  
            <textarea
              name="descricao"
              placeholder="Descripción"
              value={form.descricao}
              onChange={handleChange}
            />
  
            <input
              type="number"
              name="duracao_horas"
              placeholder="Duración (horas)"
              value={form.duracao_horas}
              onChange={handleChange}
            />
  
            <select
              name="dificuldade"
              value={form.dificuldade}
              onChange={handleChange}
            >
              <option value="Fácil">Fácil</option>
              <option value="Médio">Medio</option>
              <option value="Difícil">Difícil</option>
            </select>
  
            <input
              type="number"
              step="0.01"
              name="preco_estimado"
              placeholder="Precio estimado"
              value={form.preco_estimado}
              onChange={handleChange}
            />
  
            <input
              type="text"
              name="categoria"
              placeholder="Categoría"
              value={form.categoria}
              onChange={handleChange}
            />
  
            <input
              type="number"
              name="avaliacao"
              placeholder="Calificación (1 a 5)"
              min="1"
              max="5"
              value={form.avaliacao}
              onChange={handleChange}
            />
  
            <button type="submit">
              Crear Ruta
            </button>
  
          </form>
  
          {mensagem && (
            <p className="sucesso">
              {mensagem}
            </p>
          )}
  
          {erro && (
            <p className="erro">
              {erro}
            </p>
          )}
  
          <Link
            to={"/roteiros"}
            className="voltar-roteiros"
          >
            ← Volver a las rutas
          </Link>
  
        </div>
  
      </div>
  
    </div>
  
  );
}

export default CadastrarRoteiro;
