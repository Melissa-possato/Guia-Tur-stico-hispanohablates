import { useEffect, useState } from "react";
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
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    "https://images.unsplash.com/photo-1511578314322-379afb476865",
    "https://images.unsplash.com/photo-1521334884684-d80222895322"
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

              <button>Ver Detalhes</button>
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
