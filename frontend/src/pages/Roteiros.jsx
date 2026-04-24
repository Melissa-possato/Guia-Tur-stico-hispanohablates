import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Roteiros() {
  const [roteiros, setRoteiros] = useState([]);
  const navigate = useNavigate();

  const roteirosProntos = [
    {
      id_roteiro: "p1",
      titulo: "Roteiro Natureza",
      descricao: "Passeio pelos parques mais bonitos de São Carlos.",
      duracao_horas: 3,
      dificuldade: "Fácil",
      categoria: "Natureza",
      preco_estimado: "Grátis"
    },
    {
      id_roteiro: "p2",
      titulo: "Roteiro Cultural",
      descricao: "Conheça museus e pontos históricos da cidade.",
      duracao_horas: 2,
      dificuldade: "Fácil",
      categoria: "Cultura",
      preco_estimado: "R$10"
    },
    {
      id_roteiro: "p3",
      titulo: "Roteiro Universitário",
      descricao: "Explore os famosos campus universitários da cidade.",
      duracao_horas: 2,
      dificuldade: "Fácil",
      categoria: "Educação",
      preco_estimado: "Grátis"
    }
  ];

  const carregarRoteiros = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/roteiro", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
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

  useEffect(() => {
    carregarRoteiros();
  }, []);

  return (
    <div>

      <h1>Roteiros Turísticos</h1>

      {/* 🔥 BOTÃO NOVO */}
      <button onClick={() => navigate("cadastrarRoteiro")}>
        + Criar novo roteiro
      </button>

      <h2>Roteiros disponíveis</h2>

      {[...roteirosProntos, ...roteiros].map((r) => (
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
        </div>
      ))}

    </div>
  );
}

export default Roteiros;