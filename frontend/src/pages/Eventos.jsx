import { useState } from "react";
import { Link } from "react-router-dom";


function Eventos() {

  const eventosPorMes = {

  Março: [
    {
      titulo: "Carnaval de São Carlos",
      data: "1 a 8 de Março",
      horario: "19:00",
      local: "Centro de São Carlos",
      categoria: "Cultura",
    },

    {
      titulo: "Desfile das Escolas de Samba",
      data: "Março",
      horario: "20:00",
      local: "Passarela do Samba",
      categoria: "Música",
    },

    {
      titulo: "Comemoração do Mês da Mulher",
      data: "8 de Março",
      horario: "14:00",
      local: "Câmara Municipal",
      categoria: "Social",
    },
  ],

  Abril: [
    {
      titulo: "GP Extreme Damha de Triathlon",
      data: "1 a 3 de Abril",
      horario: "08:00",
      local: "Parque Damha",
      categoria: "Esportes",
    },

    {
      titulo: "8ª Festa do Milho de Água Vermelha",
      data: "9 e 10 de Abril",
      horario: "18:00",
      local: "Água Vermelha",
      categoria: "Gastronomia",
    },

    {
      titulo: "45ª Festa do Clima",
      data: "29 Abril a 1 Maio",
      horario: "17:00",
      local: "Centro",
      categoria: "Cultura",
    },
  ],

  Maio: [
    {
      titulo: "Virada Cultural",
      data: "14 e 15 de Maio",
      horario: "18:00",
      local: "Centro Cultural",
      categoria: "Arte",
    },

    {
      titulo: "4º Matsuri",
      data: "7 e 8 de Maio",
      horario: "16:00",
      local: "São Carlos",
      categoria: "Cultura",
    },

    {
      titulo: "11ª Semana Pró Casa do Pinhal",
      data: "23 a 29 de Maio",
      horario: "10:00",
      local: "Casa do Pinhal",
      categoria: "História",
    },
  ],

  Junho: [
    {
      titulo: "Festival Viola de Todos os Cantos",
      data: "4 de Junho",
      horario: "19:00",
      local: "Teatro Municipal",
      categoria: "Música",
    },

    {
      titulo: "Arraiá do Santa Felícia",
      data: "17 e 18 de Junho",
      horario: "18:00",
      local: "Santa Felícia",
      categoria: "Festa Junina",
    },

    {
      titulo: "Feira da Sucata e Barganha",
      data: "19 de Junho",
      horario: "09:00",
      local: "USP/UFSCar",
      categoria: "Feira",
    },
  ],

  Julho: [
    {
      titulo: "Rock na Estação",
      data: "1 e 2 de Julho",
      horario: "20:00",
      local: "Estação Cultura",
      categoria: "Rock",
    },

    {
      titulo: "Parada do Orgulho LGBT",
      data: "3 de Julho",
      horario: "14:00",
      local: "Centro",
      categoria: "Diversidade",
    },

    {
      titulo: "Festa da Laranja com Açúcar",
      data: "15 a 17 de Julho",
      horario: "18:00",
      local: "Santa Eudóxia",
      categoria: "Cultura",
    },
  ],

  Agosto: [
    {
      titulo: "Encontro Frateschi de Ferreomodelismo",
      data: "20 de Agosto",
      horario: "10:00",
      local: "Estação Cultura",
      categoria: "Exposição",
    },

    {
      titulo: "Feriado Municipal Aparecidinha",
      data: "15 de Agosto",
      horario: "09:00",
      local: "Paróquia Aparecidinha",
      categoria: "Religioso",
    },

    {
      titulo: "Comemoração da Cultura da Paz",
      data: "28 de Agosto",
      horario: "19:00",
      local: "Teatro Municipal",
      categoria: "Música",
    },
  ],

  Setembro: [
    {
      titulo: "Dia da Pátria",
      data: "7 de Setembro",
      horario: "08:00",
      local: "Centro",
      categoria: "Cívico",
    },

    {
      titulo: "TUSCA",
      data: "15 a 18 de Setembro",
      horario: "10:00",
      local: "USP e UFSCar",
      categoria: "Universitário",
    },

    {
      titulo: "Aracy em Festa",
      data: "24 e 25 de Setembro",
      horario: "17:00",
      local: "Cidade Aracy",
      categoria: "Cultura",
    },
  ],

  Outubro: [
    {
      titulo: "Estação Leitura",
      data: "Outubro",
      horario: "09:00",
      local: "Estação Cultura",
      categoria: "Literatura",
    },

    {
      titulo: "Festival MUSA",
      data: "21 a 23 de Outubro",
      horario: "19:00",
      local: "Teatro Municipal",
      categoria: "Música",
    },

    {
      titulo: "Mostra de Ciência e Tecnologia",
      data: "25 a 29 de Outubro",
      horario: "14:00",
      local: "São Carlos",
      categoria: "Tecnologia",
    },
  ],

  Novembro: [
    {
      titulo: "Aniversário de São Carlos",
      data: "4 de Novembro",
      horario: "09:00",
      local: "Centro",
      categoria: "Cívico",
    },

    {
      titulo: "Festival Audiovisual",
      data: "9 de Novembro",
      horario: "18:00",
      local: "SESC",
      categoria: "Cinema",
    },

    {
      titulo: "Sanca Hip Hop",
      data: "26 e 27 de Novembro",
      horario: "16:00",
      local: "Centro Cultural",
      categoria: "Hip Hop",
    },
  ],

  Dezembro: [
    {
      titulo: "Cantatas de Natal",
      data: "Dezembro",
      horario: "19:00",
      local: "Centro",
      categoria: "Natal",
    },

    {
      titulo: "Decoração Natalina",
      data: "Dezembro",
      horario: "18:00",
      local: "Praças da Cidade",
      categoria: "Natal",
    },

    {
      titulo: "Festival Chorando Sem Parar",
      data: "Dezembro",
      horario: "20:00",
      local: "Teatro Municipal",
      categoria: "Música",
    },
  ],

};


  const meses = Object.keys(eventosPorMes);

 const mes = Object.keys(eventosPorMes);

const [mesAtual, setMesAtual] = useState(meses[0]);

  const mudarMes = (direcao) => {
    const indiceAtual = meses.indexOf(mesAtual);

    if (direcao === "proximo") {
      const novoIndice = (indiceAtual + 1) % meses.length;
      setMesAtual(meses[novoIndice]);
    } else {
      const novoIndice =
        (indiceAtual - 1 + meses.length) % meses.length;
      setMesAtual(meses[novoIndice]);
    }
  };

  return (
    <div className="eventos-page">

      <div className="titulo-eventos">
        <h1>Calendário de Eventos</h1>
        <p>Descubra os melhores eventos acontecendo em São Carlos</p>
      </div>

      <div className="mes-selector">
        <button onClick={() => mudarMes("anterior")}>◀</button>

        <h2>{mesAtual} 2026</h2>

        <button onClick={() => mudarMes("proximo")}>▶</button>
      </div>

      <h2 className="destaque">Eventos em Destaque</h2>

      <div className="cards-eventos">

        {eventosPorMes[mesAtual].map((evento, index) => (
          <div className="card-evento" key={index}>

            <img src={evento.imagem} alt={evento.titulo} />

            <div className="evento-info">

              <span className="categoria">
                {evento.categoria}
              </span>

              <h3>{evento.titulo}</h3>

              <p>📅 {evento.data}</p>
              <p>⏰ {evento.horario}</p>
              <p>📍 {evento.local}</p>

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