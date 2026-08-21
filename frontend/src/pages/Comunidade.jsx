
import { useState, useEffect, useCallback } from "react";
import "../App.css";
import { Link } from "react-router-dom"

function decodificarToken(token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(payloadJson);
    } catch {
      return null;
    }
  }

function formatarData(isoString) {
  const data = new Date(isoString);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export const API_URL = "http://localhost:5000";


const RESPOSTA_MAX = 500;

 function Comunidade() {
  const [comunidade, setComunidade] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [novoTexto, setNovoTexto] = useState("");
  const [novoTipo, setNovoTipo] = useState("experiencia");
  const [enviando, setEnviando] = useState(false);

  const token = localStorage.getItem("token");
  const usuarioAtual = token ? decodificarToken(token) : null;

  const carregarComunidade = useCallback(() => {
    setCarregando(true);
    fetch(`${API_URL}/comunidade`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar comunidade.");
        return res.json();
      })
      .then((dados) => {
        setComunidade(dados);
        setErro(null);
      })
      .catch(() => setErro("Não foi possível carregar as comunidade agora."))
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    carregarComunidade();
  }, [carregarComunidade]);

  async function handlePublicar(e) {
    e.preventDefault();
    if (!novoTexto.trim() || enviando) return;

    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/comunidade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ texto: novoTexto.trim(), tipo: novoTipo })
      });

      if (!res.ok) throw new Error();

      setNovoTexto("");
      carregarComunidade();
    } catch {
      setErro("Não foi possível publicar. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }


  async function handleResponder(parentId, texto) {
    const res = await fetch(`${API_URL}/comunidade/${parentId}/responder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ texto })
    });

    if (!res.ok) throw new Error("Falha ao responder");
    carregarComunidade();
  }

  async function handleExcluir(id) {
    const res = await fetch(`${API_URL}/comunidade/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) carregarComunidade();
  }

  return (
    <div className="comunidade-pagina">
      <header className="comunidade-cabecalho">
        <span className="comunidade-eyebrow">Diário da comunidade</span>
        <h1>Comunidade</h1>
        <p>
          Um relato de quem já passou por aqui. Conte sua experiência, deixe
          uma sugestão, ou responda a quem já registrou a sua.
        </p>
      </header>

      {token ? (
        <form className="comunidade-composer" onSubmit={handlePublicar}>
          <div className="comunidade-tipo-toggle" role="radiogroup" aria-label="Tipo de registro">
            <button
              type="button"
              className={novoTipo === "experiencia" ? "ativo" : ""}
              onClick={() => setNovoTipo("experiencia")}
              aria-pressed={novoTipo === "experiencia"}
            >
              <span className="ponto ponto-experiencia" />
              Experiência
            </button>
            <button
              type="button"
              className={novoTipo === "sugestao" ? "ativo" : ""}
              onClick={() => setNovoTipo("sugestao")}
              aria-pressed={novoTipo === "sugestao"}
            >
              <span className="ponto ponto-sugestao" />
              Sugestão
            </button>
          </div>

          <textarea
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value.slice(0, RESPOSTA_MAX))}
            placeholder={
              novoTipo === "experiencia"
                ? "Como foi sua vivência por aqui?"
                : "O que poderia melhorar ou o que outras pessoas deveriam saber?"
            }
            rows={3}
          />

          <div className="comunidade-composer-rodape">
            <span className="comunidade-contador">
              {novoTexto.length}/{RESPOSTA_MAX}
            </span>
            <button type="submit" disabled={!novoTexto.trim() || enviando}>
              {enviando ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      ) : (
        <div className="comunidade-login-aviso">
          Faça login para compartilhar sua vivência ou responder a alguém.
        </div>
      )}

      {erro && <p className="comunidade-erro">{erro}</p>}

      <section className="comunidade-trilha" aria-label="Lista de comunidade">
        {carregando && <p className="comunidade-status">Carregando comunidade...</p>}

        {!carregando && comunidade.length === 0 && !erro && (
          <p className="comunidade-status">
            Ainda não há nenhum registro. Seja a primeira pessoa a contar algo.
          </p>
        )}

        {comunidade.map((item) => (
          <ComentarioNode
            key={item.id_comunidade}
            item={item}
            profundidade={0}
            usuarioAtual={usuarioAtual}
            token={token}
            onResponder={handleResponder}
            onExcluir={handleExcluir}
          />
        ))}
      </section>
    </div>
  );
}

function ComentarioNode({ item, profundidade, usuarioAtual, token, onResponder, onExcluir }) {
  const [respondendo, setRespondendo] = useState(false);
  const [textoResposta, setTextoResposta] = useState("");
  const [enviandoResposta, setEnviandoResposta] = useState(false);
  const [erroResposta, setErroResposta] = useState(null);

  const ehDono = usuarioAtual && usuarioAtual.id === item.usuario_id;

  async function enviarResposta(e) {
    e.preventDefault();
    if (!textoResposta.trim() || enviandoResposta) return;

    setEnviandoResposta(true);
    setErroResposta(null);
    try {
      await onResponder(item.id_comunidade, textoResposta.trim());
      setTextoResposta("");
      setRespondendo(false);
    } catch {
      setErroResposta("Não foi possível enviar a resposta.");
    } finally {
      setEnviandoResposta(false);
    }
  }

  return (
    <div className="comunidade-galho" style={{ "--profundidade": profundidade }}>
      <div className="comunidade-marcador">
        <span className={`ponto ponto-${item.tipo}`} />
        {(item.respostas.length > 0 || profundidade > 0) && (
          <span className="linha-trilha" aria-hidden="true" />
        )}
      </div>

      <article className="comunidade-cartao">
        <header className="comunidade-cartao-topo">
          <span className="comunidade-autor">{item.nome_usuario}</span>
          <span className="comunidade-tag">
            {item.tipo === "sugestao" ? "sugestão" : "experiência"}
          </span>
          <time className="comunidade-data" dateTime={item.criado_em}>
            {formatarData(item.criado_em)}
          </time>
        </header>

        <p className="comunidade-texto">{item.texto}</p>

        <footer className="comunidade-cartao-rodape">
          {token && (
            <button
              type="button"
              className="comunidade-acao"
              onClick={() => setRespondendo((v) => !v)}
            >
              {respondendo ? "cancelar" : "responder"}
            </button>
          )}
          {ehDono && (
            <button
              type="button"
              className="comunidade-acao comunidade-acao-excluir"
              onClick={() => onExcluir(item.id_comunidade)}
            >
              excluir
            </button>
          )}
        </footer>

        {respondendo && (
          <form className="comunidade-resposta-form" onSubmit={enviarResposta}>
            <textarea
              autoFocus
              rows={2}
              value={textoResposta}
              onChange={(e) => setTextoResposta(e.target.value.slice(0, RESPOSTA_MAX))}
              placeholder={`Responder a ${item.nome_usuario}...`}
            />
            {erroResposta && <p className="comunidade-erro">{erroResposta}</p>}
            <div className="comunidade-composer-rodape">
              <span className="comunidade-contador">
                {textoResposta.length}/{RESPOSTA_MAX}
              </span>
              <button type="submit" disabled={!textoResposta.trim() || enviandoResposta}>
                {enviandoResposta ? "Enviando..." : "Enviar resposta"}
              </button>
            </div>
          </form>
        )}
      </article>

      {item.respostas.length > 0 && (
        <div className="comunidade-respostas">
          {item.respostas.map((filho) => (
            <ComentarioNode
              key={filho.id_comunidade}
              item={filho}
              profundidade={profundidade + 1}
              usuarioAtual={usuarioAtual}
              token={token}
              onResponder={onResponder}
              onExcluir={onExcluir}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Comunidade