import { Link } from "react-router-dom";

function CardContato({ titulo, numero }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", width: "150px" }}>
      <h4>{titulo}</h4>
      <p style={{ color: "red", fontWeight: "bold" }}>{numero}</p>
    </div>
  );
}

function CardDica({ titulo, dicas }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", width: "300px" }}>
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
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", width: "300px" }}>
      <h3>{nome}</h3>
      <p>📍 {endereco}</p>
      <p>⏰ {horario}</p>
      <p>📞 {telefone}</p>
    </div>
  );
}

function Sobrevivencia() {
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Modo Supervivencia</h1>
      <p>Información esencial para su seguridad y bienestar</p>

      <div style={{ border: "1px solid red", padding: "10px", margin: "20px 0" }}>
        <h3 style={{ color: "red" }}>En caso de emergencia</h3>
        <p>Mantenga la calma y llame a los números de emergencia</p>
      </div>

      <h2>Contactos de Emergencia</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <CardContato titulo="Policía" numero="190" />
        <CardContato titulo="Bomberos" numero="193" />
        <CardContato titulo="Ambulancia" numero="192" />
        <CardContato titulo="Defensa Civil" numero="199" />
      </div>

      <h2 style={{ marginTop: "30px" }}>Consejos de Seguridad</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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

      <h2 style={{ marginTop: "30px" }}>Lugares Importantes</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <CardLocal
          nome="Santa Casa São Carlos"
          endereco=" R. Paulino Botelho de Abreu Sampaio, 573 - Jardim Pureza, São Carlos - SP, 13561-060"
          horario="24 horas"
          telefone="(16) 3509-1100"
        />

        <CardLocal
          nome="Delegacia Seccional de Polícia Civil de São Carlos"
          endereco="R. Santos Dumont, 500 - Vila Celina, São Carlos - SP, 13566-445"
          horario="24 horas"
          telefone="(16) 3361-1314"
        />

        <CardLocal
          nome="Droga Raia"
          endereco="Av. São Carlos, 2461 - Centro, São Carlos - SP, 13560-011"
          horario="24 horas"
          telefone="(16) 99619-3614"
        />

        <CardLocal
        nome="Prefectura Municipal"
          endereco=" R. Episcopal, 1575 - Centro, São Carlos - SP, 13560-570"
          horario="09:00 - 17:00"
          telefone="(16) 3362-1000"
        />
       <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", width: "100%", marginTop: "20px" }}>
            <h3>Información Útil</h3>
            <ul>
                El código de área de la ciudad es (16)
                Para llamar desde el exterior, use el código +55
                Wi-Fi público disponible en plazas y centros culturales
                Tensión eléctrica: 110V/220V - verifique antes de usar aparatos
            </ul>
            </div>
      </div>

      <hr style={{ margin: "20px 0" }} />
      <Link to="/">Volver</Link>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> d17e6ad4aa2ccd4a9f1fe6a032b7be800e5f85b3
export default Sobrevivencia;