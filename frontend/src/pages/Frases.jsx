
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function BotaoCategoria({ nome, ativo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`botao-categoria ${ativo ? "ativo" : ""}`}
    >
      {nome}
    </button>
  );
}

function CardFrase({ pt, en }) {
  return (
    <div className="card-frase">
      <h3>{pt}</h3>
      <p>{en}</p>
    </div>
  );
}

function BancoPalavras({ palavras }) {
  return (
    <div className="banco">
      <h3>Banco de palavras</h3>

      <ul>
        {palavras.map((p, i) => (
          <li key={i}>
            <strong>{p.pt}</strong> - {p.es}
          </li>
        ))}
      </ul>
    </div>
  );

};function Passos({ passos = [], idCategoria }) {

  async function adicionarPasso() {

    if (!idCategoria) {
      alert("Categoria inválida");
      return;
    }

    const descricao = prompt("Digite o novo passo:");

    if (!descricao) return;

    try {

      const resposta = await fetch(
        "http://localhost:5000/adicionarPasso",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            id_categoria: idCategoria,
            descricao,
            ordem_passo: passos.length + 1
          })
        }
      );

      const dados = await resposta.json();

      alert(dados.mensagem || dados.erro);

      window.location.reload();

    } catch (erro) {

      console.log(erro);

      alert("Erro ao adicionar passo");

    }
  }

  async function excluirPasso(id) {

    console.log("ID PARA EXCLUIR:", id);
  
    try {
  
      const resposta = await fetch(
        `http://localhost:5000/passo/${id}`,
        {
          method: "DELETE"
        }
      );
  
      const dados = await resposta.json();
  
      alert(dados.mensagem || dados.erro);
  
      window.location.reload();
  
    } catch (erro) {
  
      console.log(erro);
  
      alert("Erro ao excluir passo");
  
    }
  }

  async function editarPasso(id, textoAtual) {

    const novaDescricao = prompt(
      "Editar passo:",
      textoAtual
    );

    if (!novaDescricao) return;

    try {

      const resposta = await fetch(
        `http://localhost:5000/passo/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            descricao: novaDescricao
          })
        }
      );

      const dados = await resposta.json();

      alert(dados.mensagem || dados.erro);

      window.location.reload();

    } catch (erro) {

      console.log(erro);

      alert("Erro ao editar passo");

    }
  }

  return (

    <div className="passos">

      <h3>Passo a passo</h3>

      <ul className="lista-passos">

        {passos.map((p, i) => (

        
        <li key={p.id_passo || i} className="item-passo">


            <div className="numero-passo">
              {i + 1}
            </div>
            <div className="texto-passo">
              {p.descricao}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >

              <button
                onClick={() =>
                  editarPasso(
                    p.id_passo,
                    p.descricao
                  )
                }
              >
                ✏️
              </button>

              <button
                onClick={() =>
                  excluirPasso(p.id_passo)
                }
              >
                ❌
              </button>

            </div>

          </li>

        ))}

      </ul>

      <button
        onClick={adicionarPasso}
        className="botao-votar"
      >
        Adicionar Passo
      </button>

    </div>

  );
}

function Frases() {

  const [dados, setDados] = useState({});
  const [categoriaAtiva, setCategoriaAtiva] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {

    fetch("http://localhost:5000/frases")
      .then((res) => res.json())
      .then((data) => {

        setDados(data);

        const categorias = Object.keys(data);

        if (categorias.length > 0) {
          setCategoriaAtiva(categorias[0]);
        }

        setCarregando(false);

      })
      .catch((err) => {

        console.log(err);

        setCarregando(false);

      });

  }, []);

  async function excluirFrase(id) {

    console.log("ID PARA EXCLUIR:", id);
  
    try {
  
      const resposta = await fetch(
        `http://localhost:5000/frase/${id}`,
        {
          method: "DELETE"
        }
      );
  
      const dados = await resposta.json();
  
      alert(dados.mensagem || dados.erro);
  
      window.location.reload();
  
    } catch (erro) {
  
      console.log(erro);
  
      alert("Erro ao excluir Frase");
  
    }
  }

  if (carregando) {
    return <h1>Carregando...</h1>;
  }

  if (!dados[categoriaAtiva]) {
    return <h1>Nenhuma categoria encontrada</h1>;
  }

  const categorias = Object.keys(dados);
  const atual = dados[categoriaAtiva];


  return (


      <section className="secao-frases">
    
        <div className="overlay">
    
          <div className="container">
    
            <h1 className="titulo">
              Frases Úteis
            </h1>
    
            <p className="subtitulo">
              Aprenda expressões essenciais para se comunicar durante sua viagem
            </p>
    
            <div className="botoes">
    
              {categorias.map((cat) => (
    
                <BotaoCategoria
                  key={cat}
                  nome={cat}
                  ativo={categoriaAtiva === cat}
                  onClick={() => setCategoriaAtiva(cat)}
                />
    
              ))}
    
            </div>
    
            <Passos
              passos={atual?.passos || []}
              idCategoria={atual?.id_categoria}
            />
    
            <h3
              style={{
                marginTop: "20px",
                color: "white"
              }}
            >
              Frases
            </h3>

          {atual?.frases?.map((f, i) => (

      <div>
            <CardFrase
              key={i}
              pt={f.pt}
              en={f.es}
              />
    
              <button
                onClick={() =>
                  excluirFrase(id_frase)
                }
              >
                ❌
              </button>

          </div>

          ))}

          <BancoPalavras palavras={atual?.palavras || []} />

          <hr style={{ margin: "20px 0" }} />

          <Link to="/" className="botao-voltar">
            ← Voltar
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Frases;

