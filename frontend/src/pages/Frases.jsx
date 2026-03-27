import { useState } from "react";
import { Link } from "react-router-dom";

// Botão de categoria
function BotaoCategoria({ nome, ativo, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: "20px",
        border: "1px solid #ccc",
        background: ativo ? "#22c55e" : "#f3f4f6",
        color: ativo ? "white" : "#333",
        cursor: "pointer",
      }}
    >
      {nome}
    </button>
  );
}

// Card de frase
function CardFrase({ pt, en }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "12px",
        marginBottom: "10px",
        background: "white",
      }}
    >
      <h3>{pt}</h3>
      <p style={{ color: "gray" }}>{en}</p>
    </div>
  );
}

function Frases() {
  const categorias = [
    "Básico",
    "Restaurante",
    "Transporte",
    "Compras",
    "Emergência",
    "Hotel",
  ];

  const [categoriaAtiva, setCategoriaAtiva] = useState("Básico");

  // ainda vazio
  const frases = [
    { categoria: "Restaurante", pt: "Quero um café", en: "I want a coffee" },
    { categoria: "Restaurante", pt: "A conta, por favor", en: "The bill, please" },
    { categoria: "Transporte", pt: "Onde fica a estação?", en: "Where is the station?" },
    { categoria: "Transporte", pt: "Quanto custa a passagem?", en: "How much is the ticket?" }
  ];

  const frasesFiltradas = frases.filter(
    (f) => f.categoria === categoriaAtiva
  );

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Aprenda expressões essenciais</h1>

      {/* Botões */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {categorias.map((cat) => (
          <BotaoCategoria
            key={cat}
            nome={cat}
            ativo={categoriaAtiva === cat}
            onClick={() => setCategoriaAtiva(cat)}
          />
        ))}
      </div>

      {/* Frases */}
      {frasesFiltradas.length > 0 ? (
        frasesFiltradas.map((f, i) => (
          <CardFrase key={i} pt={f.pt} en={f.en} />
        ))
      ) : (
        <p style={{ color: "gray" }}>Nenhuma frase ainda...</p>
      )}

      <hr style={{ margin: "20px 0" }} />

      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
}

export default Frases;