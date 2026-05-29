import { Link } from "react-router-dom";

import "./App.css";
import "./index.css";

import {
  FaMapMarkedAlt,
  FaShieldAlt,
  FaComments,
  FaLandmark,
  FaRoute,
  FaCalendarAlt
} from "react-icons/fa";

function App() {

  return (
    <>
      {/* HERO */}
      <section className="hero">

        <div className="hero-text">

          <h1>Explore a Cidade com Confiança</h1>

          <p>
            Seu guia completo com mapas, dicas culturais,
            frases úteis e muito mais.
          </p>

          <button>
            Começar a Explorar →
          </button>

        </div>

      </section>

      {/* CARDS */}
      <section className="cards-section">

        <h2>
          Tudo que Você Precisa em Um Só Lugar
        </h2>

        <p>
          Ferramentas e recursos para tornar sua estadia
          mais fácil, segura e enriquecedora.
        </p>

        <div className="cards-container">

          <Link to="/mapa" className="card">

            <div className="icon green">
              <FaMapMarkedAlt size={30} />
            </div>

            <h3>Mapa da Cidade</h3>

            <p>
              Explore os principais pontos turísticos.
            </p>

            <span className="explore">
              Explorar →
            </span>

          </Link>

          <Link to="/sobrevivencia" className="card">

            <div className="icon red">
              <FaShieldAlt size={30} />
            </div>

            <h3>Modo Sobrevivência</h3>

            <p>
              Dicas essenciais de segurança.
            </p>

            <span className="explore">
              Explorar →
            </span>

          </Link>

          <Link to="/frases" className="card">

            <div className="icon green">
              <FaComments size={30} />
            </div>

            <h3>Frases Úteis</h3>

            <p>
              Aprenda expressões importantes.
            </p>

            <span className="explore">
              Explorar →
            </span>

          </Link>

          <Link to="/guiacultural" className="card">

            <div className="icon purple">
              <FaLandmark size={30} />
            </div>

            <h3>Guia Cultural</h3>

            <p>
              Conheça costumes e tradições locais.
            </p>

            <span className="explore">
              Explorar →
            </span>

          </Link>

          <Link to="/roteiros" className="card">

            <div className="icon orange">
              <FaRoute size={30} />
            </div>

            <h3>Roteiros</h3>

            <p>
              Planeje sua viagem com roteiros prontos.
            </p>

            <span className="explore">
              Explorar →
            </span>

          </Link>

          <Link to="/eventos" className="card">

            <div className="icon pink">
              <FaCalendarAlt size={30} />
            </div>

            <h3>Eventos</h3>

            <p>
              Descubra eventos acontecendo na cidade.
            </p>

            <span className="explore">
              Explorar →
            </span>

          </Link>

        </div>

      </section>

      {/* INFO */}
      <section className="info-section">

        <div className="info-card">

          <h3>Dica Rápida</h3>

          <p>
            Sempre tenha um mapa offline disponível.
            Baixe as áreas antes de sair.
          </p>

        </div>

        <div className="info-card">

          <h3>Horário de Funcionamento</h3>

          <p>
            O comércio funciona das 9h às 18h.
          </p>

          <p>
            Sábado: 9h - 12h
            <br />
            Domingo: maioria fechada
          </p>

        </div>

        <div className="info-card">

          <h3>Transporte Local</h3>

          <p>
            O transporte público funciona
            das 5:20 às 22:35.
          </p>

          <p>
            Aos finais de semana muitos horários mudam.
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-container">

          <div>

            <h3>Guia Turístico</h3>

            <p>
              Seu companheiro perfeito para explorar
              a cidade com confiança.
            </p>

          </div>

          <div>

            <h3>Links Rápidos</h3>

            <Link to="/mapa">Mapa</Link>
            <br />

            <Link to="/sobrevivencia">
              Modo Sobrevivência
            </Link>

            <br />

            <Link to="/eventos">
              Eventos
            </Link>

          </div>

          <div>

            <h3>Feito por:</h3>

            <p>Ana Luiza Alteia</p>
            <p>Emily Miglior</p>
            <p>Duda Giamlourenço</p>
            <p>Melissa Possato</p>

          </div>

        </div>

        <div className="footer-bottom">
          © 2026 Guia Turístico.
          Todos os direitos reservados.
        </div>

      </footer>
    </>
  );
}

export default App;
