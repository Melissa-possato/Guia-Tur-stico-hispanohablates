import { Link } from "react-router-dom";

function GuiaCultural() {
  return (
    <>
      <h1>Guía Cultural - São Carlos/SP</h1>
      <p>Conozca un poco de la cultura, costumbres y curiosidades de la ciudad.</p>

      <Link to="/">Volver a la página principal</Link>

      <hr />

      <h2>Aspectos Culturales</h2>

      <div>
        <h3>Historia</h3>
        <ul>
          <li>São Carlos fue fundada en 1857</li>
          <li>Creció mucho con la economía del café</li>
          <li>Recibió muchos inmigrantes italianos</li>
          <li>Hoy es conocida como la Capital de la Tecnología</li>
        </ul>
      </div>

      <div>
        <h3>Costumbres Locales</h3>
        <ul>
          <li>La ciudad tiene una fuerte vida universitaria</li>
          <li>Es común salir a cafeterías, bares y restaurantes</li>
          <li>Los eventos académicos y culturales son frecuentes</li>
          <li>La gente suele ser amable y tranquila</li>
        </ul>
      </div>

      <div>
        <h3>Gastronomía Típica</h3>
        <ul>
          <li>Pastel con jugo de caña</li>
          <li>Pamonha y curau</li>
          <li>Platos tradicionales en festivales locales</li>
          <li>Hamburguesas y bocadillos artesanales famosos</li>
        </ul>
      </div>

      <div>
        <h3>Arte y Música</h3>
        <ul>
          <li>Festival de chorinho muy famoso</li>
          <li>Eventos en el SESC y teatros municipales</li>
          <li>Presentaciones musicales universitarias</li>
          <li>Ferias culturales los fines de semana</li>
        </ul>
      </div>

      <div>
        <h3>Festividades</h3>
        <ul>
          <li>Fiesta de las Naciones</li>
          <li>Festival Chorando Sem Parar</li>
          <li>Fiestas juninas</li>
          <li>Fiestas universitarias tradicionales</li>
        </ul>
      </div>

      <div>
        <h3>Etiqueta Social</h3>
        <ul>
          <li>Respete las filas y los espacios públicos</li>
          <li>Sea cordial con los habitantes</li>
          <li>En lugares universitarios el ambiente es informal</li>
          <li>Valore los espacios culturales de la ciudad</li>
        </ul>
      </div>

      <hr />

      <h2>Información Esencial</h2>

      <div>
        <h3>Idioma</h3>
        <p>El portugués es el idioma oficial.</p>
      </div>

      <div>
        <h3>Clima</h3>
        <p>Clima tropical de altitud, con verano cálido e invierno suave.</p>
      </div>

      <div>
        <h3>Lugares Culturales</h3>
        <p>UFSCar, USP, SESC, Teatro Municipal y Museo de la Ciencia.</p>
      </div>

      <hr />

      <div>
        <h2>Haz</h2>
        <ul>
          <li>Visita el SESC</li>
          <li>Conoce la USP y la UFSCar</li>
          <li>Prueba la gastronomía local</li>
          <li>Participa en ferias y festivales</li>
        </ul>
      </div>

      <div>
        <h2>Evita</h2>
        <ul>
          <li>Tirar basura en áreas verdes</li>
          <li>Hacer ruido en zonas residenciales por la noche</li>
          <li>Faltar el respeto en espacios universitarios</li>
          <li>Ignorar los eventos culturales de la ciudad</li>
        </ul>
      </div>

      <hr />

      <h2>Consejo de Inmersión Cultural</h2>
      <p>
        La mejor manera de conocer São Carlos es visitar las universidades,
        participar en eventos culturales, ferias gastronómicas y disfrutar de
        la vida nocturna universitaria.
      </p>
    </>
  );
}

export default GuiaCultural;
