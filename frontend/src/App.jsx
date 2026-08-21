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
        <h1>Explora la Ciudad con Confianza</h1>

          <p>
            Tu guía completa con mapas, consejos culturales,
            frases útiles y mucho más.
          </p>

          <button>
            Empezar a Explorar →
          </button>

        </div>

      </section>

      {/* CARDS */}
      <section className="cards-section">

      <h2>
        Todo lo que Necesitas en un Solo Lugar
      </h2>

      <p>
        Herramientas y recursos para hacer tu estancia
        más fácil, segura y enriquecedora.
      </p>

      <div className="cards-container">

      <Link to="/mapa" className="card">

        <div className="icon green">
          <FaMapMarkedAlt size={30} />
        </div>

        <h3>Mapa de la Ciudad</h3>

        <p>
          Explora los principales puntos turísticos.
        </p>

        <span className="explore">
          Explorar →
        </span>

      </Link>

      <Link to="/sobrevivencia" className="card">

        <div className="icon red">
          <FaShieldAlt size={30} />
        </div>

        <h3>Modo Supervivencia</h3>

        <p>
          Consejos esenciales de seguridad.
        </p>

        <span className="explore">
          Explorar →
        </span>

      </Link>

      <Link to="/frases" className="card">

        <div className="icon green">
          <FaComments size={30} />
        </div>

        <h3>Frases Útiles</h3>

        <p>
          Aprende expresiones importantes.
        </p>

        <span className="explore">
          Explorar →
        </span>

      </Link>

      <Link to="/guiacultural" className="card">

        <div className="icon purple">
          <FaLandmark size={30} />
        </div>

        <h3>Guía Cultural</h3>

        <p>
          Conoce costumbres y tradiciones locales.
        </p>

        <span className="explore">
          Explorar →
        </span>

      </Link>

      <Link to="/roteiros" className="card">

        <div className="icon orange">
          <FaRoute size={30} />
        </div>

        <h3>Itinerarios</h3>

        <p>
          Planifica tu viaje con itinerarios listos.
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
          Descubre eventos que ocurren en la ciudad.
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

      <h3>Consejo Rápido</h3>

      <p>
        Siempre ten un mapa sin conexión disponible.
        Descarga las áreas antes de salir.
      </p>

      </div>

      <div className="info-card">

      <h3>Horario de Apertura</h3>

      <p>
        El comercio funciona de 9:00 a 18:00.
      </p>

      <p>
        Sábado: 9:00 - 12:00
        <br />
        Domingo: cerrado
      </p>

      </div>

      <div className="info-card">

      <h3>Transporte Local</h3>

      <p>
        El transporte público funciona
        de 5:20 a 22:35.
      </p>

      <p>
        Los fines de semana muchos horarios cambian.
      </p>

      </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">

      <div className="footer-container">

      <div>

        <h3>Guía Turística</h3>

        <p>
          Tu compañero perfecto para explorar
          la ciudad con confianza.
        </p>

      </div>

      <div>

        <h3>Enlaces Rápidos</h3>

        <Link to="/mapa">Mapa</Link>
        <br />

        <Link to="/sobrevivencia">
          Modo Supervivencia
        </Link>

        <br />

        <Link to="/eventos">
          Eventos
        </Link>

      </div>

      <div>

        <h3>Hecho por:</h3>

        <p>Ana Luiza Alteia</p>
        <p>Emily Miglior</p>
        <p>Duda Giamlourenço</p>
        <p>Melissa Possato</p>

      </div>

      </div>

      <div className="footer-bottom">
      © 2026 Guía Turística.
      Todos los derechos reservados.
      </div>

      </footer>
      </>
      );
      }

export default App;
