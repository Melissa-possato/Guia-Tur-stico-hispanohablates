drop database if exists guiaTuristico;
create database guiaTuristico;
use guiaTuristico;

/*início*/

CREATE TABLE cadastro (
    id_cadastro INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    nome_usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone varchar (20),
    origem varchar (50)
);


/*mapa*/

CREATE TABLE mapa (
    id_mapa INT AUTO_INCREMENT PRIMARY KEY,
    id_cadastro INT,
    nome_local VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    data_busca DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cadastro) REFERENCES cadastro(id_cadastro)
);

/*roteiros*/

CREATE TABLE roteiro (
    id_roteiro INT AUTO_INCREMENT PRIMARY KEY,
    id_cadastro INT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    duracao_horas INT,
    dificuldade VARCHAR(20),
    preco_estimado VARCHAR(10),
    categoria VARCHAR(50),
    avaliacao INT,
    
    FOREIGN KEY (id_cadastro) REFERENCES cadastro(id_cadastro)
);

CREATE TABLE IF NOT EXISTS avaliacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roteiro_id INT NOT NULL,
  usuario_id INT NOT NULL,
  nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
  FOREIGN KEY (roteiro_id) REFERENCES roteiro(id_roteiro) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES cadastro(id_cadastro) ON DELETE CASCADE,
  UNIQUE(roteiro_id, usuario_id) 
);

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roteiro_id INT NOT NULL,
    usuario_id INT NOT NULL,
    texto VARCHAR(200),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (roteiro_id) REFERENCES roteiro(id_roteiro),
    FOREIGN KEY (usuario_id) REFERENCES cadastro(id_cadastro)
);

CREATE TABLE curtidas (
    roteiro_id INT NOT NULL,
    usuario_id INT NOT NULL,
    

    PRIMARY KEY (roteiro_id, usuario_id),
    FOREIGN KEY (roteiro_id) REFERENCES roteiro(id_roteiro),
    FOREIGN KEY (usuario_id) REFERENCES cadastro(id_cadastro)
);

CREATE TABLE favoritos (
    roteiro_id INT NOT NULL,
    usuario_id INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (roteiro_id, usuario_id),
FOREIGN KEY (roteiro_id) REFERENCES roteiro(id_roteiro),
    FOREIGN KEY (usuario_id) REFERENCES cadastro(id_cadastro)
);

CREATE TABLE categoria_frase (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE frase (
    id_frase INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    pt TEXT NOT NULL,
    es TEXT NOT NULL,

    FOREIGN KEY (id_categoria)
    REFERENCES categoria_frase(id_categoria)
);

CREATE TABLE palavra (
    id_palavra INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    pt VARCHAR(100),
    es VARCHAR(100),

    FOREIGN KEY (id_categoria)
    REFERENCES categoria_frase(id_categoria)
);

CREATE TABLE passo (
    id_passo INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    descricao TEXT,
    ordem_passo INT,

    FOREIGN KEY (id_categoria)
    REFERENCES categoria_frase(id_categoria)
);

INSERT INTO categoria_frase (nome)
VALUES ('Compras'), ('Banco'), ('Escola'), ('Saúde'), ('Moradia');


/*MERCADO*/
INSERT INTO palavra (id_categoria, pt, es) VALUES
(1, 'supermercado', 'supermercado'),
(1, 'carrinho', 'carrito'),
(1, 'cesta', 'canasta'),
(1, 'corredor', 'pasillo'),
(1, 'frutas', 'frutas'),
(1, 'verduras', 'verduras'),
(1, 'promoção', 'promoción'),
(1, 'desconto', 'descuento'),
(1, 'preço', 'precio'),
(1, 'caixa', 'caja'),
(1, 'sacola', 'bolsa'),
(1, 'dinheiro', 'efectivo'),
(1, 'cartão', 'tarjeta');

INSERT INTO frase (id_categoria, pt, es) VALUES
(1, 'Bom dia! Você pode me ajudar?', 'Buenos días ¿Puede ayudarme?'),
(1, 'O que você está procurando?', '¿Qué está buscando?'),
(1, 'Estou procurando arroz integral', 'Estoy buscando arroz integral'),
(1, 'Em qual corredor fica?', '¿En qué pasillo está?'),
(1, 'Essas maçãs estão em promoção?', '¿Estas manzanas están en promoción?'),
(1, 'Vou pagar no débito', 'Voy a pagar con débito'),
(1, 'Precisa de sacola?', '¿Necesita bolsa?');




/*BANCO*/
INSERT INTO passo (id_categoria, descricao, ordem_passo)
VALUES
(2, 'Cumprimentar o atendente (Saludar al empleado)', 1),
(2, 'Dizer que deseja abrir uma conta (Decir que quiere abrir una cuenta)', 2),
(2, 'Entregar documentos (Entregar los documentos)', 3),
(2, 'Informar dados pessoais (Informar datos personales)', 4),
(2, 'Escolher o tipo de conta (Elegir el tipo de cuenta)', 5),
(2, 'Criar senha (Crear una contraseña)', 6),
(2, 'Confirmar abertura da conta (Confirmar la apertura de la cuenta)', 7);
INSERT INTO frase (id_categoria, pt, es) VALUES
(2, 'Quero abrir uma conta', 'Quiero abrir una cuenta'),
(2, 'Você já é cliente do banco?', '¿Ya es cliente del banco?'),
(2, 'É minha primeira conta aqui', 'Es mi primera cuenta aquí'),
(2, 'Trouxe meus documentos', 'Traje mis documentos'),
(2, 'Pode me informar seu telefone?', '¿Puede decirme su teléfono'),
(2, 'Qual é a diferença?', '¿Cuál es la diferencia?'),
(2, 'Prefiro conta corrente', 'Prefiero cuenta corriente'),
(2, 'Agora vamos criar sua senha', 'Ahora vamos a crear su contraseña');


INSERT INTO passo (id_categoria, descricao, ordem_passo)
VALUES
(1, 'Cumprimentar o atendente (Saludar al empleado)', 1),

(1,'Dizer que deseja abrir uma conta (Decir que quiere abrir una cuenta)', 2),

(1,   'Entregar documentos (Entregar los documentos)', 3),

(1, '"Informar dados pessoais (Informar datos personales)', 4),

(1, 'Escolher o tipo de conta (Elegir el tipo de cuenta)', 5),

(1, 'Criar senha (Crear una contraseña)', 6),

(1, 'Confirmar abertura da conta (Confirmar la apertura de la cuenta)', 7);

INSERT INTO palavra (id_categoria, pt, es) VALUES
(2, 'banco', 'banco'),
(2, 'conta bancária', 'cuenta bancaria'),
(3, 'conta corrente', 'cuenta corriente'),
(2, 'conta poupança', 'cuenta de ahorro'),
(2, 'cartão', 'tarjeta'),
(2, 'senha', 'contraseña'),
(2, 'aplicativo do banco', 'aplicación del banco'),
(2, 'comprovante de endereço', 'comprobante de domicilio'),
(2, 'RG', 'documento de identidad'),
(2, 'CPF', 'número de identificación'),
(2, 'agência', 'sucursal'),
(2, 'saque', 'retiro'),
(2, 'depósito', 'depósito'),
(2, 'transferência', 'transferencia');




INSERT INTO palavra (id_categoria, pt, es) VALUES
(3, 'matrícula', 'matrícula'),
(3, 'inscrição', 'inscripción'),
(3, 'curso', 'curso'),
(3, 'aluno', 'alumno'),
(3, 'secretaria', 'secretaría'),
(3, 'escola', 'escuela'),
(3, 'faculdade', 'facultad'),
(3, 'universidade', 'universidad'),
(3, 'formulário', 'formulario'),
(3, 'documentos', 'documentos'),
(3, 'histórico escolar', 'historial académico'),
(3, 'calendário escolar', 'calendario escolar');
INSERT INTO passo (id_categoria, descricao, ordem_passo) VALUES
(3, 'Ir à secretaria da instituição (Ir a la secretaría de la institución)', 1),
(3, 'Informar o curso desejado (Informar el curso deseado)', 2),
(3, 'Entregar os documentos (Entregar los documentos)', 3),
(3, 'Preencher a ficha de inscrição (Llenar el formulario de inscripción)', 4),
(3, 'Confirmar a matrícula (Confirmar la matrícula)', 5);
INSERT INTO frase (id_categoria, pt, es) VALUES
(3, 'Quero fazer matrícula em um curso', 'Quiero matricularme en un curso'),
(3, 'Qual curso você deseja?', '¿Qué curso desea?'),
(3, 'Quero o curso técnico em informática', 'Quiero el curso técnico en informática'),
(3, 'É a primeira vez', 'Es mi primera vez'),
(3, 'Preciso dos seus documentos', 'Necesito sus documentos'),
(3, 'Onde eu entrego depois?', '¿Dónde lo entrego después?'),
(3, 'Já preenchi tudo', 'Ya lo completé'),
(3, 'Seja bem-vindo ao curso', '¡Bienvenido al curso!');




INSERT INTO palavra (id_categoria, pt, es) VALUES
(4, 'médico', 'médico'),
(4, 'consulta', 'consulta'),
(4, 'paciente', 'paciente'),
(4, 'recepção', 'recepción'),
(4, 'sala de espera', 'sala de espera'),
(4, 'dor de cabeça', 'dolor de cabeza'),
(4, 'dor de garganta', 'dolor de garganta'),
(4, 'febre', 'fiebre'),
(4, 'remédio', 'medicamento'),
(4, 'receita médica', 'receta médica'),
(4, 'exame', 'examen'),
(4, 'hospital', 'hospital'),
(4, 'clínica', 'clínica');
INSERT INTO passo (id_categoria, descricao, ordem_passo) VALUES
(4, 'Informar o nome na recepção (Informar el nombre en la recepción)', 1),
(4, 'Confirmar o horário da consulta (Confirmar la hora de la cita)', 2),
(4, 'Aguardar na sala de espera (Esperar en la sala de espera)', 3),
(4, 'Explicar os sintomas ao médico (Explicar los síntomas al médico)', 4),
(4, 'Receber receita ou orientação (Recibir receta o indicaciones)', 5);
INSERT INTO frase (id_categoria, pt, es) VALUES
(4, 'Qual é o seu nome?', '¿Cuál es su nombre?'),
(4, 'Tenho consulta às 10 horas', 'Tengo una cita a las 10'),
(4, 'Você tem consulta marcada?', '¿Tiene una cita?'),
(4, 'Pode aguardar na sala de espera', 'Puede esperar en la sala de espera'),
(4, 'O que você está sentindo?', '¿Qué está sintiendo?'),
(4, 'Estou com dor de garganta e febre', 'Tengo dolor de garganta y fiebre'),
(4, 'Há quantos dias você está assim?', '¿Desde hace cuántos días?'),
(4, 'Você precisa tomar este remédio', 'Necesita tomar este medicamento');



INSERT INTO palavra (id_categoria, pt, es) VALUES
(5, 'aluguel', 'alquiler'),
(5, 'casa', 'casa'),
(5, 'apartamento', 'apartamento'),
(5, 'contrato', 'contrato'),
(5, 'corretor', 'agente inmobiliario'),
(5, 'imobiliária', 'inmobiliaria'),
(5, 'depósito', 'depósito'),
(5, 'fiador', 'garante'),
(5, 'condomínio', 'condominio'),
(5, 'visita', 'visita'),
(5, 'chave', 'llave'),
(5, 'aluguel mensal', 'alquiler mensual');
INSERT INTO passo (id_categoria, descricao, ordem_passo) VALUES
(5, 'Procurar imóvel disponível (Buscar un inmueble disponible)', 1),
(5, 'Perguntar o valor do aluguel (Preguntar el valor del alquiler)', 2),
(5, 'Marcar visita (Programar una visita)', 3),
(5, 'Enviar documentos (Enviar documentos)', 4),
(5, 'Assinar contrato (Firmar el contrato)', 5);
INSERT INTO frase (id_categoria, pt, es) VALUES
(5, 'Esta casa está disponível para aluguel?', '¿Esta casa está disponible para alquiler?'),
(5, 'Qual é o valor do aluguel?', '¿Cuál es el valor del alquiler?'),
(5, 'O valor inclui condomínio?', '¿El valor incluye el condominio?'),
(5, 'Quantos quartos a casa tem?', '¿Cuántas habitaciones tiene la casa?'),
(5, 'Posso visitar o imóvel?', '¿Puedo visitar la casa?'),
(5, 'Gostei da casa', 'Me gustó la casa'),
(5, 'O que preciso para alugar?', '¿Qué necesito para alquilar?'),
(5, 'Vou enviar os documentos', 'Voy a enviar los documentos');

CREATE TABLE evento (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    data_evento VARCHAR(100),
    horario TIME,
    local_evento VARCHAR(255),
    categoria VARCHAR(100),
    mes VARCHAR(50)
);
/* =========================
   MARÇO
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('Carnaval de São Carlos', '1 a 8 de Março', '19:00:00', 'Centro de São Carlos', 'Cultura', 'Março'),

('Desfile das Escolas de Samba', 'Março', '20:00:00', 'Passarela do Samba', 'Música', 'Março'),

('Comemoração do Mês da Mulher', '8 de Março', '14:00:00', 'Câmara Municipal', 'Social', 'Março');


/* =========================
   ABRIL
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('GP Extreme Damha de Triathlon', '1 a 3 de Abril', '08:00:00', 'Parque Damha', 'Esportes', 'Abril'),

('8ª Festa do Milho de Água Vermelha', '9 e 10 de Abril', '18:00:00', 'Água Vermelha', 'Gastronomia', 'Abril'),

('45ª Festa do Clima', '29 Abril a 1 Maio', '17:00:00', 'Centro', 'Cultura', 'Abril');


/* =========================
   MAIO
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('Virada Cultural', '14 e 15 de Maio', '18:00:00', 'Centro Cultural', 'Arte', 'Maio'),

('4º Matsuri', '7 e 8 de Maio', '16:00:00', 'São Carlos', 'Cultura', 'Maio'),

('11ª Semana Pró Casa do Pinhal', '23 a 29 de Maio', '10:00:00', 'Casa do Pinhal', 'História', 'Maio');


/* =========================
   JUNHO
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('Festival Viola de Todos os Cantos', '4 de Junho', '19:00:00', 'Teatro Municipal', 'Música', 'Junho'),

('Arraiá do Santa Felícia', '17 e 18 de Junho', '18:00:00', 'Santa Felícia', 'Festa Junina', 'Junho'),

('Feira da Sucata e Barganha', '19 de Junho', '09:00:00', 'USP/UFSCar', 'Feira', 'Junho');


/* =========================
   JULHO
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('Rock na Estação', '1 e 2 de Julho', '20:00:00', 'Estação Cultura', 'Rock', 'Julho'),

('Parada do Orgulho LGBT', '3 de Julho', '14:00:00', 'Centro', 'Diversidade', 'Julho'),

('Festa da Laranja com Açúcar', '15 a 17 de Julho', '18:00:00', 'Santa Eudóxia', 'Cultura', 'Julho');


/* =========================
   AGOSTO
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('Encontro Frateschi de Ferreomodelismo', '20 de Agosto', '10:00:00', 'Estação Cultura', 'Exposição', 'Agosto'),

('Feriado Municipal Aparecidinha', '15 de Agosto', '09:00:00', 'Paróquia Aparecidinha', 'Religioso', 'Agosto'),

('Comemoração da Cultura da Paz', '28 de Agosto', '19:00:00', 'Teatro Municipal', 'Música', 'Agosto');


/* =========================
   SETEMBRO
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('Dia da Pátria', '7 de Setembro', '08:00:00', 'Centro', 'Cívico', 'Setembro'),

('TUSCA', '15 a 18 de Setembro', '10:00:00', 'USP e UFSCar', 'Universitário', 'Setembro'),

('Aracy em Festa', '24 e 25 de Setembro', '17:00:00', 'Cidade Aracy', 'Cultura', 'Setembro');


/* =========================
   OUTUBRO
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('Estação Leitura', 'Outubro', '09:00:00', 'Estação Cultura', 'Literatura', 'Outubro'),

('Festival MUSA', '21 a 23 de Outubro', '19:00:00', 'Teatro Municipal', 'Música', 'Outubro'),

('Mostra de Ciência e Tecnologia', '25 a 29 de Outubro', '14:00:00', 'São Carlos', 'Tecnologia', 'Outubro');


/* =========================
   NOVEMBRO
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('Aniversário de São Carlos', '4 de Novembro', '09:00:00', 'Centro', 'Cívico', 'Novembro'),

('Festival Audiovisual', '9 de Novembro', '18:00:00', 'SESC', 'Cinema', 'Novembro'),

('Sanca Hip Hop', '26 e 27 de Novembro', '16:00:00', 'Centro Cultural', 'Hip Hop', 'Novembro');


/* =========================
   DEZEMBRO
========================= */

INSERT INTO evento 
(titulo, data_evento, horario, local_evento, categoria, mes)
VALUES
('Cantatas de Natal', 'Dezembro', '19:00:00', 'Centro', 'Natal', 'Dezembro'),

('Decoração Natalina', 'Dezembro', '18:00:00', 'Praças da Cidade', 'Natal', 'Dezembro'),

('Festival Chorando Sem Parar', 'Dezembro', '20:00:00', 'Teatro Municipal', 'Música', 'Dezembro');


show tables;
SELECT * FROM categoria_frase;
select * from palavra;
insert into cadastro (nome_usuario, senha, telefone, origem) values ("teste", "123", "55 16 997618004", "Brasil");
select * from cadastro;