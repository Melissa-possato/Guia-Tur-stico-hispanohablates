import { Link } from "react-router-dom";
import "../App.css";

function GuiaCultural() {
  return (
    <div className="cultural-bg">
      {/* FUNDO */}

      <div className="cultural-container">

        {/* TOPO */}
        <div className="cultural-header">
          <h1>Guía Cultural - São Carlos/SP</h1>
          <p>
            Conozca la historia, tradiciones y costumbres de la ciudad
          </p>
        </div>

        {/* IMAGEM */}
        <div className="cultural-banner"></div>

        {/* ASPECTOS CULTURAIS */}
        <h2 className="section-title">Aspectos Culturales</h2>

        <div className="cards-grid">

          <div className="card">
            <h3>Historia</h3>
            <ul>
              <li>São Carlos fue fundada en 1857</li>
              <li>Creció con la economía del café</li>
              <li>Recibió muchos inmigrantes italianos</li>
              <li>Conocida como la Capital de la Tecnología</li>
            </ul>
          </div>

          <div className="card">
            <h3>Costumbres Locales</h3>
            <ul>
              <li>Fuerte vida universitaria</li>
              <li>Cafeterías, bares y restaurantes populares</li>
              <li>Eventos culturales y académicos frecuentes</li>
              <li>Personas amables y tranquilas</li>
            </ul>
          </div>

          <div className="card">
            <h3>Gastronomía</h3>
            <ul>
              <li>Pastel con jugo de caña</li>
              <li>Pamonha y curau</li>
              <li>Comida típica en festivales</li>
              <li>Hamburguesas artesanales</li>
            </ul>
          </div>

          <div className="card">
            <h3>Arte y Música</h3>
            <ul>
              <li>Festival "Chorando Sem Parar"</li>
              <li>Eventos en SESC y teatros</li>
              <li>Presentaciones universitarias</li>
              <li>Ferias culturales</li>
            </ul>
          </div>

          <div className="card">
            <h3>Festividades</h3>
            <ul>
              <li>Fiesta de las Naciones</li>
              <li>Festival de Chorinho</li>
              <li>Fiestas juninas</li>
              <li>Eventos universitarios</li>
            </ul>
          </div>

          <div className="card">
            <h3>Etiqueta Social</h3>
            <ul>
              <li>Respete filas y espacios públicos</li>
              <li>Sea cordial con los habitantes</li>
              <li>Ambiente universitario informal</li>
              <li>Valore los espacios culturales</li>
            </ul>
          </div>

        </div>

        {/* INFORMAÇÕES ESSENCIAIS */}
        <h2 className="section-title">Información Esencial</h2>

        <div className="info-grid">

          <div className="info-card">
            <h3>Idioma</h3>
            <p>El portugués es el idioma oficial. El inglés se entiende en algunos lugares.</p>
          </div>

          <div className="info-card">
            <h3>Clima</h3>
            <p>Clima tropical de altitud, con veranos cálidos e inviernos suaves.</p>
          </div>

          <div className="info-card">
            <h3>Lugares Culturales</h3>
            <p>USP, UFSCar, SESC, Teatro Municipal y museos científicos.</p>
          </div>

          <div className="info-card">
            <h3>Vida Universitaria</h3>
            <p>Gran presencia de estudiantes, eventos, fiestas y actividades culturales.</p>
          </div>

        </div>

        {/* FAÇA / EVITE */}
        <div className="tips-container">

          <div className="tips do">
            <h2>✔ Haz</h2>
            <ul>
              <li>Visita el SESC</li>
              <li>Conoce la USP y UFSCar</li>
              <li>Prueba la gastronomía local</li>
              <li>Participa en eventos culturales</li>
            </ul>
          </div>

          <div className="tips dont">
            <h2>✖ Evita</h2>
            <ul>
              <li>Tirar basura en áreas verdes</li>
              <li>Hacer ruido por la noche</li>
              <li>Faltar el respeto</li>
              <li>Ignorar la cultura local</li>
            </ul>
          </div>

        </div>

        {/* CONSELHO FINAL */}
        <div className="final-tip">
          <h2>Consejo Cultural</h2>
          <p>
            La mejor forma de conocer São Carlos es vivir su ambiente universitario,
            participar en eventos culturales y explorar su gastronomía.
          </p>
        </div>

        {/* BOTÃO */}
        <Link to="/" className="back-btn">
          Volver al inicio
        </Link>

      </div>
    </div>
  );
}

export default GuiaCultural;