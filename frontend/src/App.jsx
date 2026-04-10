import { useState } from 'react'
import { Link } from "react-router-dom";
import "./App.css";
import "./index.css";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaLandmark } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {  FaUserCircle } from "react-icons/fa"; // Adicionado ícone de usuário

function App() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const nomeSalvo = localStorage.getItem("nomeUsuario");

    if (token && nomeSalvo) {

      setUsuario({ nome: nomeSalvo });
    }
  }, []);

  const fazerLogout = () => {
    localStorage.clear(); 
    setUsuario(null); 
    navigate("/"); 
  };
  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <h2 className="icon green"> <FaMapMarkedAlt />  Guia Turístico</h2>
        <nav>
          <Link to="/mapa">Mapa</Link>
          <Link to="/sobrevivencia">Sobrevivência</Link>
          <Link to="/frases">Frases</Link>
          <Link to="/guiacultural">Guia Cultural</Link>
          <Link to="/roteiros">Roteiros</Link>
          <Link to="/eventos">Eventos</Link>
            {usuario ? (
              <button onClick={() => navigate("/login")}>
                <FaUserCircle  color="black" />
              </button>
          ) : (
           
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Explore a Cidade com Confiança</h1>
          <p>
            Seu guia completo com mapas, dicas culturais, frases úteis e muito mais.
          </p>
          <button>Começar a Explorar →</button>
        </div>
      </section>

      {/* SEÇÃO CARDS */}
      <section className="cards-section">
        <h2>Tudo que Você Precisa em Um Só Lugar</h2>
        <p>
          Ferramentas e recursos para tornar sua estadia mais fácil, segura e enriquecedora.
        </p>

        <div className="cards-container">

          {/* CARD 1 */}
          <Link to="/mapa" className="card">
            <div className="icon green">
              <FaMapMarkedAlt size={30} />
            </div>
            <h3>Mapa da Cidade</h3>
            <p>Explore os principais pontos turísticos.</p>
            <span className="explore">Explorar →</span>
          </Link>

          {/* CARD 2 */}
          <Link to="/sobrevivencia" className="card">
            <div className="icon red">
              <FaShieldAlt size={30} />
            </div>
            <h3>Modo Sobrevivência</h3>
            <p>Dicas essenciais de segurança.</p>
            <span className="explore">Explorar →</span>
          </Link>

          {/* CARD 3 */}
          <Link to="/Frases" className="card">
            <div className="icon green">
              <FaComments size={30} />
            </div>
            <h3>Frases Úteis</h3>
            <p>Aprenda expressões importantes.</p>
            <span className="explore">Explorar →</span>
          </Link>

          {/* CARD 4 */}
          <Link to="/GuiaCultural" className="card">
            <div className="icon purple">
              <FaLandmark size={30} />
            </div>
            <h3>Guia Cultural</h3>
            <p>Conheça costumes e tradições locais.</p>
            <span className="explore">Explorar →</span>
          </Link>
          {/* CARD 5 */}

          <Link to="/Roteiros" className="card">
            <div className="icon orange">
              <FaRoute size={30} />
            </div>
            <h3>Roteiros</h3>
            <p>Planeje sua viagem com roteiros prontos.</p>
            <span className="explore">Explorar →</span>
          </Link>

          {/* CARD 6 */}
          <Link to="/Eventos" className="card">
            <div className="icon pink">
              <FaCalendarAlt size={30} />
            </div>
            <h3>Eventos</h3>
            <p>Descubra eventos acontecendo na cidade.</p>
            <span className="explore">Explorar →</span>
          </Link>

        </div>
      </section>


      {/* SEÇÃO DE DICAS */}
      <section className="info-section">
        <div className="info-card">
          <h3>Dica Rápida</h3>
          <p>
            Sempre tenha um mapa offline disponível. Baixe as áreas que você planeja visitar antes de sair.
          </p>
        </div>

        <div className="info-card">
          <h3>Horário de Funcionamento</h3>
          <p>
            O comércio local funciona de Segunda a Sexta, das 9h às 18h. 
          </p>
          <p>
            Aos finais de semana: <br />
            Sábado: 9h - 12h <br />
            Domingo: Maioria dos estabelecimentos estão fechados
          </p>
        </div>

        <div className="info-card">
          <h3>Transporte Local</h3>
          <p>
            O transporte público funciona das 5:20 às 22:35 Horário de Brasília. <br />
            Aos finais de semana e feriado muitas linhas são reduzidas ou fazem horários diferentes <br />
            Fique Alerta ao site www.soutransporte.com.br ou ao aplicativo SOU São Carlos <br />
             Considere táxis ou aplicativos para horários noturnos. <br />
             Telefone Use Taxi: (16) 33
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">

          <div>
            <h3>Guia Turístico</h3>
            <p>
              Seu companheiro perfeito para explorar a cidade com confiança e estilo.
            </p>
          </div>

          <div>
            <h3>Links Rápidos</h3>

            <Link to="/mapa">Mapa</Link><br></br>
            <Link to="/sobrevivencia">Modo Sobrevivência</Link><br></br>
            <Link to="/eventos">Eventos</Link>

          </div>

          <div>
            <h3>Contato</h3>
            <p>contato@guiaturistico.com</p>
            <p>+55 (16) 1234-5678</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 Guia Turístico. Todos os direitos reservados.
        </div>
      </footer>


    </>
  );
}

export default App;
