import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "http://localhost:5000";

function Roteiros() {
  const [roteiros, setRoteiros] = useState([]);
  const [interacoes, setInteracoes] = useState({});
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false); 

  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const fetchAutenticado = async (url, options = {}) => {
    const token = getToken();
    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(options.headers || {})
      }
    });

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("token");
      navigate("/login");
      throw new Error("Sessão expirada");
    }

    return res.json();
  };

  const carregarRoteiros = async () => {
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const data = await fetchAutenticado("/roteiro", { method: "GET" });
      setRoteiros(data);
      carregarInteracoes(data);
    } catch (error) {
      console.error("Erro ao carregar roteiros:", error);
      setRoteiros([]);
    }
  };

  // Carrega curtidas, favoritos e avaliações de cada roteiro
  const carregarInteracoes = async (lista) => {
    const novasInteracoes = {};

    await Promise.all(
      lista.map(async (r) => {
        try {
          const [curtidas, favorito, avaliacoes] = await Promise.all([
            fetchAutenticado(`/roteiro/${r.id_roteiro}/curtidas`),
            fetchAutenticado(`/roteiro/${r.id_roteiro}/favorito`),
            fetchAutenticado(`/roteiro/${r.id_roteiro}/avaliacoes`)
          ]);

          novasInteracoes[r.id_roteiro] = {
            curtiu: curtidas.curtiu,
            totalCurtidas: curtidas.total,
            favoritou: favorito.favoritou,
            media: avaliacoes.media,
            notaUsuario: avaliacoes.notaUsuario,
            comentarios: [],
            mostrarComentarios: false,
            comentariosCarregados: false,
            novoComentario: ""
          };
        } catch (error) {
          console.error(`Erro ao carregar interações do roteiro ${r.id_roteiro}:`, error);
        }
      })
    );

    setInteracoes(novasInteracoes);
  };

  const atualizarInteracao = (id, dados) => {
    setInteracoes((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...dados }
    }));
  };

  const alternarCurtir = async (id) => {
    try {
      const resultado = await fetchAutenticado(`/roteiro/${id}/curtir`, { method: "POST" });
      const atual = interacoes[id];
      atualizarInteracao(id, {
        curtiu: resultado.curtiu,
        totalCurtidas: atual.totalCurtidas + (resultado.curtiu ? 1 : -1)
      });
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  };

  const alternarFavoritar = async (id) => {
    try {
      const resultado = await fetchAutenticado(`/roteiro/${id}/favoritar`, { method: "POST" });
      atualizarInteracao(id, { favoritou: resultado.favoritou });
    } catch (error) {
      console.error("Erro ao favoritar:", error);
    }
  };

  const avaliar = async (id, nota) => {
    try {
      await fetchAutenticado(`/roteiro/${id}/avaliar`, {
        method: "POST",
        body: JSON.stringify({ nota })
      });
      const novasAvaliacoes = await fetchAutenticado(`/roteiro/${id}/avaliacoes`);
      atualizarInteracao(id, {
        media: novasAvaliacoes.media,
        notaUsuario: novasAvaliacoes.notaUsuario
      });
    } catch (error) {
      console.error("Erro ao avaliar:", error);
    }
  };

  const alternarComentarios = async (id) => {
    const atual = interacoes[id];

    if (!atual.mostrarComentarios && !atual.comentariosCarregados) {
      try {
        const comentarios = await fetchAutenticado(`/roteiro/${id}/comentarios`);
        atualizarInteracao(id, {
          comentarios,
          comentariosCarregados: true,
          mostrarComentarios: true
        });
        return;
      } catch (error) {
        console.error("Erro ao carregar comentários:", error);
      }
    }

    atualizarInteracao(id, { mostrarComentarios: !atual.mostrarComentarios });
  };

  const enviarComentario = async (id) => {
    const texto = interacoes[id]?.novoComentario?.trim();
    if (!texto) return;

    try {
      await fetchAutenticado(`/roteiro/${id}/comentarios`, {
        method: "POST",
        body: JSON.stringify({ texto })
      });

      const comentarios = await fetchAutenticado(`/roteiro/${id}/comentarios`);
      atualizarInteracao(id, { comentarios, novoComentario: "" });
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
  };

  const roteirosExibidos = mostrarFavoritos
  ? roteiros.filter((r) => interacoes[r.id_roteiro]?.favoritou)
  : roteiros;

  useEffect(() => {
    carregarRoteiros();
  }, []);

  return (
    <div className="roteiros-bg">
      <div className="roteiros-container">
        <div className="roteiros-header">
          <h1>Rutas Turísticas</h1>
          <p>Explora experiencias increíbles en São Carlos.</p>
        </div>

        <div className="acoes-roteiro">
          <button onClick={() => navigate("/cadastrarRoteiro")} className="btn-criar">
            + Crear Nueva Ruta
          </button>
        </div>

        <h2 className="titulo-roteiros">Rutas Disponibles</h2>

        {/* ABAS TODOS / FAVORITOS */}
        <div className="abas-filtro">
          <button
            className={`aba-btn ${!mostrarFavoritos ? "ativa" : ""}`}
            onClick={() => setMostrarFavoritos(false)}
          >
            Todas las rutas
          </button>
          <button
            className={`aba-btn ${mostrarFavoritos ? "ativa" : ""}`}
            onClick={() => setMostrarFavoritos(true)}
          >
            ⭐ Mis favoritos
          </button>
        </div>
        
        <div className="roteiros-grid">
        {roteirosExibidos.length === 0 && mostrarFavoritos ? (
          <p className="sem-favoritos">
            Todavía no tienes rutas favoritas. Haz clic en ☆ Guardar en alguna ruta para verla aquí.
          </p>
        ):

          (roteirosExibidos.map((r) => {
            const interacao = interacoes[r.id_roteiro] || {};

            return (
              <div key={r.id_roteiro} className="roteiro-card">
                <div className="roteiro-topo">
                  <span className="categoria-roteiro">{r.categoria}</span>
                  <span className={`dificuldade ${r.dificuldade?.toLowerCase()}`}>
                    {r.dificuldade}
                  </span>
                </div>

                <h3>{r.titulo}</h3>
                <p className="descricao">{r.descricao}</p>

                <div className="roteiro-info">
                  <div className="info-item">⏰ {r.duracao_horas} horas</div>
                  <div className="info-item">💰 {r.preco_estimado}</div>
                </div>

                {/* AVALIAÇÃO */}
                <div className="avaliacao-roteiro">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <span
                      key={estrela}
                      className={`estrela ${estrela <= (interacao.notaUsuario || 0) ? "ativa" : ""}`}
                      onClick={() => avaliar(r.id_roteiro, estrela)}
                    >
                      ★
                    </span>
                  ))}
                  {interacao.media && (
                    <span className="media-avaliacao">
                      {interacao.media} ({interacao.notaUsuario ? "tu voto" : "promedio"})
                    </span>
                  )}
                </div>

                {/* CURTIR / FAVORITAR / COMENTAR */}
                <div className="interacoes-roteiro">
                  <button
                    className={`btn-curtir ${interacao.curtiu ? "ativo" : ""}`}
                    onClick={() => alternarCurtir(r.id_roteiro)}
                  >
                    {interacao.curtiu ? "❤️" : "🤍"} {interacao.totalCurtidas ?? 0}
                  </button>

                  <button
                    className={`btn-favoritar ${interacao.favoritou ? "ativo" : ""}`}
                    onClick={() => alternarFavoritar(r.id_roteiro)}
                  >
                    {interacao.favoritou ? "⭐ Favoritos" : "☆ Favoritar"}
                  </button>

                  <button
                    className="btn-comentarios"
                    onClick={() => alternarComentarios(r.id_roteiro)}
                  >
                    💬 Comentarios
                  </button>
                </div>

                {/* COMENTÁRIOS */}
                {interacao.mostrarComentarios && (
                  <div className="comentarios-area">
                    <div className="lista-comentarios">
                      {interacao.comentarios?.length > 0 ? (
                        interacao.comentarios.map((c) => (
                          <div key={c.id} className="comentario-item">
                            <strong>{c.nome_usuario}</strong>
                            <p>{c.texto}</p>
                          </div>
                        ))
                      ) : (
                        <p className="sem-comentarios">Sé el primero en comentar.</p>
                      )}
                    </div>

                    <div className="novo-comentario">
                      <input
                        type="text"
                        placeholder="Escribe un comentario..."
                        value={interacao.novoComentario || ""}
                        onChange={(e) =>
                          atualizarInteracao(r.id_roteiro, { novoComentario: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") enviarComentario(r.id_roteiro);
                        }}
                      />
                      <button onClick={() => enviarComentario(r.id_roteiro)}>Enviar</button>
                    </div>
                  </div>
                )}
              </div>
              );
            })
          )}
        </div>
      </div>


      <div className="voltar-home">
        <button onClick={() => navigate("/")}>← Volver al inicio</button>
      </div>
    </div>
  );
}

export default Roteiros;