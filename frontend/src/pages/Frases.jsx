import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function BotaoCategoria({ nome, ativo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`botao-categoria ${ativo ? "ativo" : ""}`}
    >
      {nome}
    </button>
  );
}

function CardFrase({ pt, en }) {
  return (
    <div className="card-frase">
      <h3>{pt}</h3>
      <p>{en}</p>

    </div>
  );
}

function BancoPalavras({ palavras }) {
  return (
    <div className="banco">
      <h3>Banco de palavras</h3>
      <ul>
        {palavras.map((p, i) => (
          <li key={i}>
            <strong>{p.pt}</strong> - {p.en}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Passos({ passos }) {
  return (
    <div className="passos">
      <h3>Passo a passo</h3>

      <ul className="lista-passos">
        {passos.map((p, i) => (
          <li key={i} className="item-passo">
            <div className="numero-passo">{i + 1}</div>
            <div className="texto-passo">{p}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Frases() {
  const categorias = ["Compras", "Banco", "Escola", "Saúde", "Moradia"];
  const [categoriaAtiva, setCategoriaAtiva] = useState("Compras");

  const dados = {
    Compras: {
      passos: [
        "Entrar no supermercado e pegar um carrinho ou uma cesta (Entrar al supermercado y tomar un carrito o una canasta)",
        "Procurar os produtos nos corredores (Buscar los productos en los pasillos)", "Pedir ajuda a um funcionário se precisar (Preguntar a un empleado si necesita ayuda)",
        "Escolher os produtos e verificar os preços (Elegir los productos y revisar los precios)", "Ir ao caixa para pagar (Ir a la caja para pagar)",
        "Pagar em dinheiro ou cartão (Pagar en efectivo o con tarjeta)",
        "Receber o recibo e as sacolas (Recibir el recibo y las bolsas)"
      ],
      frases: [
        { pt: "Bom dia! Você pode me ajudar?", en: "Buenos días ¿Puede ayudarme?" },
        { pt: "O que você está procurando?", en: "¿Qué está buscando?" },
        { pt: "Estou procurando arroz integral", en: "Estoy buscando arroz integral" },
        { pt: "Em qual corredor fica?", en: "¿En qué pasillo está?" },
        { pt: "Essas maçãs estão em promoção?", en: "¿Estas manzanas están en promoción?" },
        { pt: "Vou pagar no débito", en: "Voy a pagar con débito" },
        { pt: "Precisa de sacola?", en: "¿Necesita bolsa?" }],

      palavras: [
        { pt: "supermercado", en: "supermercado" },
        { pt: "carrinho", en: "carrito" },
        { pt: "cesta", en: "canasta" },
        { pt: "corredor", en: "pasillo" },
        { pt: "frutas", en: "frutas" },
        { pt: "verduras", en: "verduras" },
        { pt: "promoção", en: "promoción" },
        { pt: "desconto", en: "descuento" },
        { pt: "preço", en: "precio" },
        { pt: "caixa", en: "caja" },
        { pt: "sacola", en: "bolsa" },
        { pt: "dinheiro", en: "efectivo" },
        { pt: "cartão", en: "tarjeta" }]
    },

    Banco: {
      passos: [
        "Cumprimentar o atendente (Saludar al empleado)",
        "Dizer que deseja abrir uma conta (Decir que quiere abrir una cuenta)",
        "Entregar documentos (Entregar los documentos)",
        "Informar dados pessoais (Informar datos personales)",
        "Escolher o tipo de conta (Elegir el tipo de cuenta)",
        "Criar senha (Crear una contraseña)",
        "Confirmar abertura da conta (Confirmar la apertura de la cuenta)"],

      frases: [
        { pt: "Quero abrir uma conta", en: "Quiero abrir una cuenta" },
        { pt: "Você já é cliente do banco?", en: "¿Ya es cliente del banco?" },
        { pt: "É minha primeira conta aqui", en: "Es mi primera cuenta aquí" },
        { pt: "Trouxe meus documentos", en: "Traje mis documentos" },
        { pt: "Pode me informar seu telefone?", en: "¿Puede decirme su teléfono?" },
        { pt: "Qual é a diferença?", en: "¿Cuál es la diferencia?" },
        { pt: "Prefiro conta corrente", en: "Prefiero cuenta corriente" },
        { pt: "Agora vamos criar sua senha", en: "Ahora vamos a crear su contraseña" }],

      palavras: [
        { pt: "banco", en: "banco" },
        { pt: "conta bancária", en: "cuenta bancaria" },
        { pt: "conta corrente", en: "cuenta corriente" },
        { pt: "conta poupança", en: "cuenta de ahorro" },
        { pt: "cartão", en: "tarjeta" },
        { pt: "senha", en: "contraseña" },
        { pt: "aplicativo do banco", en: "aplicación del banco" },
        { pt: "comprovante de endereço", en: "comprobante de domicilio" },
        { pt: "RG", en: "documento de identidad" },
        { pt: "CPF", en: "número de identificación" },
        { pt: "agência", en: "sucursal" },
        { pt: "saque", en: "retiro" },
        { pt: "depósito", en: "depósito" },
        { pt: "transferência", en: "transferencia" }]
    },

    Escola: {
      passos: [
        "Ir à secretaria da instituição (Ir a la secretaría de la institución)",
        "Informar o curso desejado (Informar el curso deseado)",
        "Entregar os documentos (Entregar los documentos)",
        "Preencher a ficha de inscrição (Llenar el formulario de inscripción)",
        "Confirmar a matrícula (Confirmar la matrícula)"],

      frases: [
        { pt: "Quero fazer matrícula em um curso", en: "Quiero matricularme en un curso" },
        { pt: "Qual curso você deseja?", en: "¿Qué curso desea?" },
        { pt: "Quero o curso técnico em informática", en: "Quiero el curso técnico en informática" },
        { pt: "É a primeira vez", en: "Es mi primera vez" },
        { pt: "Preciso dos seus documentos", en: "Necesito sus documentos" },
        { pt: "Onde eu entrego depois?", en: "¿Dónde lo entrego después?" },
        { pt: "Já preenchi tudo", en: "Ya lo completé" }, { pt: "Seja bem-vindo ao curso", en: "¡Bienvenido al curso!" }],

      palavras: [
        { pt: "matrícula", en: "matrícula" },
        { pt: "inscrição", en: "inscripción" },
        { pt: "curso", en: "curso" }, { pt: "aluno", en: "alumno" },
        { pt: "secretaria", en: "secretaría" }, { pt: "escola", en: "escuela" },
        { pt: "faculdade", en: "facultad" }, { pt: "universidade", en: "universidad" },
        { pt: "formulário", en: "formulario" }, { pt: "documentos", en: "documentos" },
        { pt: "histórico escolar", en: "historial académico" }, { pt: "calendário escolar", en: "calendario escolar" }]
    },

    Saúde: {
      passos: [
        "Informar o nome na recepção (Informar el nombre en la recepción)",
        "Confirmar o horário da consulta (Confirmar la hora de la cita)",
        "Aguardar na sala de espera (Esperar en la sala de espera)",
        "Explicar os sintomas ao médico (Explicar los síntomas al médico)",
        "Receber receita ou orientação (Recibir receta o indicaciones)"],

      frases: [
        { pt: "Qual é o seu nome?", en: "¿Cuál es su nombre?" },
        { pt: "Tenho consulta às 10 horas", en: "Tengo una cita a las 10" },
        { pt: "Você tem consulta marcada?", en: "¿Tiene una cita?" },
        { pt: "Pode aguardar na sala de espera", en: "Puede esperar en la sala de espera" },
        { pt: "O que você está sentindo?", en: "¿Qué está sintiendo?" },
        { pt: "Estou com dor de garganta e febre", en: "Tengo dolor de garganta y fiebre" },
        { pt: "Há quantos dias você está assim?", en: "¿Desde hace cuántos días?" },
        { pt: "Você precisa tomar este remédio", en: "Necesita tomar este medicamento" }],

      palavras: [
        { pt: "médico", en: "médico" },
        { pt: "consulta", en: "consulta" },
        { pt: "paciente", en: "paciente" },
        { pt: "recepção", en: "recepción" },
        { pt: "sala de espera", en: "sala de espera" },
        { pt: "dor de cabeça", en: "dolor de cabeza" },
        { pt: "dor de garganta", en: "dolor de garganta" },
        { pt: "febre", en: "fiebre" },
        { pt: "remédio", en: "medicamento" },
        { pt: "receita médica", en: "receta médica" },
        { pt: "exame", en: "examen" },
        { pt: "hospital", en: "hospital" },
        { pt: "clínica", en: "clínica" }]
    },

    Moradia:
    {
      passos: [
        "Procurar imóvel disponível (Buscar un inmueble disponible)",
        "Perguntar o valor do aluguel (Preguntar el valor del alquiler)",
        "Marcar visita (Programar una visita)", "Enviar documentos (Enviar documentos)",
        "Assinar contrato (Firmar el contrato)"],

      frases: [
        { pt: "Esta casa está disponível para aluguel?", en: "¿Esta casa está disponible para alquiler?" },
        { pt: "Qual é o valor do aluguel?", en: "¿Cuál es el valor del alquiler?" },
        { pt: "O valor inclui condomínio?", en: "¿El valor incluye el condominio?" },
        { pt: "Quantos quartos a casa tem?", en: "¿Cuántas habitaciones tiene la casa?" },
        { pt: "Posso visitar o imóvel?", en: "¿Puedo visitar la casa?" },
        { pt: "Gostei da casa", en: "Me gustó la casa" },
        { pt: "O que preciso para alugar?", en: "¿Qué necesito para alquilar?" },
        { pt: "Vou enviar os documentos", en: "Voy a enviar los documentos" }],

      palavras: [{ pt: "aluguel", en: "alquiler" },
      { pt: "casa", en: "casa" },
      { pt: "apartamento", en: "apartamento" },
      { pt: "contrato", en: "contrato" },
      { pt: "corretor", en: "agente inmobiliario" },
      { pt: "imobiliária", en: "inmobiliaria" },
      { pt: "depósito", en: "depósito" }, { pt: "fiador", en: "garante" },
      { pt: "condomínio", en: "condominio" }, { pt: "visita", en: "visita" },
      { pt: "chave", en: "llave" },
      { pt: "aluguel mensal", en: "alquiler mensual" }]
    }
  };
  const atual = dados[categoriaAtiva];

  return (
    <section className="secao-frases">
      <div className="overlay">
        <div className="container">
          <h1 className="titulo">Frases Úteis</h1>

          <p className="subtitulo">
            Aprenda expressões essenciais para se comunicar durante sua viagem
          </p>

          <div className="botoes">
            {categorias.map((cat) => (
              <BotaoCategoria
                key={cat}
                nome={cat}
                ativo={categoriaAtiva === cat}
                onClick={() => setCategoriaAtiva(cat)}
              />
            ))}
          </div>

          <Passos passos={atual.passos} />

          <h3 style={{ marginTop: "20px", color: "white" }}>Frases</h3>
          {atual.frases.map((f, i) => (
            <CardFrase key={i} pt={f.pt} en={f.en} />
          ))}

          <BancoPalavras palavras={atual.palavras} />

          <hr style={{ margin: "20px 0" }} />
          <Link to="/" className="botao-voltar">
            ← Voltar
          </Link>
        </div>
      </div>
    </section>
  );
};



export default Frases;