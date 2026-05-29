import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

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

  useEffect(() => {
    carregarRoteiros();
  }, []);

  return (

    <div className="roteiros-bg">

      <div className="roteiros-container">

        {/* HEADER */}

        <div className="roteiros-header">

          <h1>Rutas Turísticas</h1>

          <p>
            Explora experiencias increíbles en São Carlos.
          </p>

        </div>

        {/* BOTÃO */}

        <div className="acoes-roteiro">

          <button
            onClick={() => navigate("/cadastrarRoteiro")}
            className="btn-criar"
          >
            + Crear Nueva Ruta
          </button>

        </div>

        {/* TITULO */}

        <h2 className="titulo-roteiros">
          Rutas Disponibles
        </h2>

        {/* GRID */}

        <div className="roteiros-grid">

          {[...roteiros].map((r) => (

            <div
              key={r.id_roteiro}
              className="roteiro-card"
            >

              <div className="roteiro-topo">

                <span className="categoria-roteiro">
                  {r.categoria}
                </span>

                <span className={`dificuldade ${r.dificuldade?.toLowerCase()}`}>
                  {r.dificuldade}
                </span>

              </div>

              <h3>{r.titulo}</h3>

              <p className="descricao">
                {r.descricao}
              </p>

              <div className="roteiro-info">

                <div className="info-item">
                  ⏰ {r.duracao_horas} horas
                </div>

                <div className="info-item">
                  💰 {r.preco_estimado}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <div className="voltar-home">
        <button onClick={() => navigate("/")}>
          ← Volver al inicio
        </button>
      </div>

    </div>

  );
}

export default Roteiros;
