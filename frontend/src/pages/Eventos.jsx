import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Eventos() {

  const [eventos, setEventos] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/eventos")
      .then((response) => response.json())
      .then((data) => {
        setEventos(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


 const imagensEventos = [
    "/carnaval.jpg",
    "/desfile.jpg",
    "/mesDaMulher.jpg",
    "/festaDoMilho.jpg",
    "/festDoClima.jpg",
    "/matsuri.jpg",
    "/casaDoPinhal.jpg",
    "/violaTodosOsCantos.jpg",
    "/arraiaSantaFelicia.jpg",
    "/festaDaSucata.jpg",
    "/rockNaEstacao.jpg",
    "/paraOrgulhoLGBT.jpg",
    "/festaDaLaranja.jpg",
    "/ferromodelismo.jpg",
    "/aparecidinha.jpg",
    "/tusca.jpg",
    "/tecnologia.jpg",
    "/aniversario.webp",
    "/audiovisual.jpg",
    "/decoracaoNatalina.jpg",
    "/chorando-sem-parar.jpg"
  ];



  return (
    <div className="eventos-page">

      <div className="titulo-eventos">
        <h1>Calendário de Eventos</h1>
        <p>Descubra os melhores eventos acontecendo em São Carlos</p>
      </div>


      <div className="cards-eventos">

        {eventos.map((evento, index) => (

          <div className="card-evento" key={evento.id_evento}>

            <img
              src={imagensEventos[index % imagensEventos.length]}
              alt={evento.titulo}
            />

            <div className="evento-info">

              <span className="categoria">
                {evento.categoria}
              </span>

              <h3>{evento.titulo}</h3>

              <p>📅 {evento.data_evento}</p>
              <p>⏰ {evento.horario}</p>
              <p>📍 {evento.local_evento}</p>
              <p>🗓️ {evento.mes}</p>

              <a rel="stylesheet" href="https://saocarlos.sp.gov.br/index.php/component/content/article/866-eventos-2011/158581-calendario-de-eventos-da-prefeitura-municipal-de-sao-carlos.html"
                  target="_blank"
                  className="eventos-info"
                >
                  Ver Detalhes
                </a>
            </div>
          </div>
        ))}

      </div>


      <div className="voltar">
        <Link to="/">← Voltar para a página inicial</Link>
      </div>

    </div>
  );
}

export default Eventos;
