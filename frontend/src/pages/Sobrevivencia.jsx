import { Link } from "react-router-dom";
import "../App.css";

function CardContato({ titulo, numero }) {
  return (
    <div className="card-contato">
      <div className="icone">⚠️</div>
      <h4>{titulo}</h4>
      <p>{numero}</p>
    </div>
  );
}

function CardDica({ titulo, dicas }) {
  return (
    <div className="card-dica">
      <h3>{titulo}</h3>
      <ul>
        {dicas.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
}

function CardLocal({ nome, endereco, horario, telefone }) {
  return (
    <div className="card-local">
      <h3>{nome}</h3>
      <p>📍 {endereco}</p>
      <p>⏰ {horario}</p>
      <p className="telefone">📞 {telefone}</p>
    </div>
  );
}

function Sobrevivencia() {
  return (
    <section className="secao-sobrevivencia">
      <div className="overlay">
        <div className="container">

          <h1 className="titulo">Modo Supervivência</h1>
          <p className="subtitulo">
            Informações essenciais para sua segurança e bem-estar
          </p>

          <div className="alerta">
            <strong>⚠️ Em caso de emergência</strong>
            <p>Mantenha a calma e ligue para os números abaixo.</p>
          </div>

          <h2>Contatos de Emergência</h2>
          <div className="grid-contatos">
            <CardContato titulo="Polícia" numero="190" />
            <CardContato titulo="Bombeiros" numero="193" />
            <CardContato titulo="Ambulância" numero="192" />
            <CardContato titulo="Defesa Civil" numero="199" />
          </div>

          <h2>Dicas de Segurança</h2>
          <div className="grid-dicas">
            <CardDica
              titulo="Documentos"
              dicas={[
                "Mantenga copias separadas de los documentos",
                "Tenga fotos digitales de documentos importantes",
                "Deje copias con alguien de confianza"
              ]}
            />

            <CardDica
              titulo="Dinero y Tarjetas"
              dicas={[
                "No lleve todo el dinero en un solo lugar",
                "Informe a su banco sobre el viaje",
                "Anote números importantes"
              ]}
            />

            <CardDica
              titulo="Seguridad Personal"
              dicas={[
                "Evite mostrar objetos de valor",
                "Use aplicaciones confiables",
                "Permanezca en lugares iluminados"
              ]}
            />

            <CardDica
              titulo="Salud"
              dicas={[
                "Lleve sus medicamentos",
                "Beba agua regularmente",
                "Tenga un kit básico"
              ]}
            />
          </div>

          <h2>Locais Importantes</h2>
          <div className="grid-locais">
            <CardLocal
              nome="Santa Casa São Carlos"
              endereco="R. Paulino Botelho de Abreu Sampaio, 573"
              horario="24 horas"
              telefone="(16) 3509-1100"
            />

            <CardLocal
              nome="Delegacia de Polícia"
              endereco="R. Santos Dumont, 500"
              horario="24 horas"
              telefone="(16) 3361-1314"
            />

            <CardLocal
              nome="Droga Raia"
              endereco="Av. São Carlos, 2461"
              horario="24 horas"
              telefone="(16) 99619-3614"
            />

            <CardLocal
              nome="Prefeitura Municipal"
              endereco="R. Episcopal, 1575"
              horario="09:00 - 17:00"
              telefone="(16) 3362-1000"
            />
          </div>

          <div className="info-util">
            <h3>Informações Úteis</h3>
            <ul>
              <li>Código de área: (16)</li>
              <li>Para chamadas internacionais: +55</li>
              <li>Wi-Fi público em praças</li>
              <li>Tensão: 110V/220V</li>
            </ul>
          </div>

          <Link to="/" className="botao-voltar">
            ← Voltar
          </Link>

        </div>
      </div>
    </section>
  );
};
export default Sobrevivencia;