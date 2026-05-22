
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
}


function Passos({ passos = [] }) {

  return (

    <div className="passos">

      <h3>Passo a passo</h3>

      <ul className="lista-passos">

        {passos.map((p, i) => (

          <li key={i} className="item-passo">

            <div className="numero-passo">
              {i + 1}
            </div>

            <div className="texto-passo">
              {p}
            </div>

          </li>

        ))}

      </ul>

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

          <Passos passos={atual.passos} />

          <h3
            style={{
              marginTop: "20px",
              color: "white"
            }}
          >
            Frases
          </h3>

          {atual?.frases?.map((f, i) => (

            <CardFrase
              key={i}
              pt={f.pt}
              en={f.es}
            />

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

