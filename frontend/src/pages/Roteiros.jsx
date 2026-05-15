import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Roteiros() {
  const [roteiros, setRoteiros] = useState([]);
  const navigate = useNavigate();

  

  const carregarRoteiros = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/roteiro", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setRoteiros(data);

    } catch (error) {
      console.error("Erro ao carregar roteiros:", error);
      setRoteiros([]);
    }
  };
  const excluirRoteiro = async (id) => {

    const confirmar = window.confirm(
      "Deseja realmente excluir este roteiro?"
    );

    if (!confirmar) return;

    const token = localStorage.getItem("token");

    try {

      const res = await fetch(
        `http://localhost:5000/roteiro/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      alert(data.mensagem);

      // remove da tela sem recarregar
      setRoteiros((prev) =>
        prev.filter((r) => r.id_roteiro !== id)
      );

    } catch (error) {

      console.error("Erro ao excluir roteiro:", error);

    }
  };

  useEffect(() => {
    carregarRoteiros();
  }, []);

  return (
    <div>

      <h1>Roteiros Turísticos</h1>

      <button onClick={() => navigate("/cadastrarRoteiro")}>
        + Criar novo roteiro
      </button>

      <h2>Roteiros disponíveis</h2>

      {[ ...roteiros].map((r) => (
        <div key={r.id_roteiro} style={{
          border:"1px solid #ccc",
          padding:"10px",
          margin:"10px",
          borderRadius:"8px"
        }}>
          <h3>{r.titulo}</h3>
          <p>{r.descricao}</p>
          <p>Duração: {r.duracao_horas} horas</p>
          <p>Dificuldade: {r.dificuldade}</p>
          <p>Categoria: {r.categoria}</p>
          <p>Preço estimado: {r.preco_estimado}</p>
          <button
            onClick={() => excluirRoteiro(r.id_roteiro)}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Excluir roteiro
          </button>
        </div>
      ))}

    </div>
  );
}

export default Roteiros;