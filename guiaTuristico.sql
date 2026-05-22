drop database if exists guiaTuristico;
create database guiaTuristico;
use guiaTuristico;

/*início*/

CREATE TABLE cadastro (
    id_cadastro INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    nome_usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
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




/*BANCO*/
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
(2, 'Cumprimentar o atendente (Saludar al empleado)', 1),

(2,'Dizer que deseja abrir uma conta (Decir que quiere abrir una cuenta)', 2),

(2,   'Entregar documentos (Entregar los documentos)', 3),

(2, '"Informar dados pessoais (Informar datos personales)', 4),

(2, 'Escolher o tipo de conta (Elegir el tipo de cuenta)', 5),

(2, 'Criar senha (Crear una contraseña)', 6),

(2, 'Confirmar abertura da conta (Confirmar la apertura de la cuenta)', 7);

INSERT INTO palavra (id_categoria, pt, es) VALUES
(1, 'banco', 'banco'),
(1, 'conta bancária', 'cuenta bancaria'),
(1, 'conta corrente', 'cuenta corriente'),
(1, 'conta poupança', 'cuenta de ahorro'),
(1, 'cartão', 'tarjeta'),
(1, 'senha', 'contraseña'),
(1, 'aplicativo do banco', 'aplicación del banco'),
(1, 'comprovante de endereço', 'comprobante de domicilio'),
(1, 'RG', 'documento de identidad'),
(1, 'CPF', 'número de identificación'),
(1, 'agência', 'sucursal'),
(1, 'saque', 'retiro'),
(1, 'depósito', 'depósito'),
(1, 'transferência', 'transferencia');




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


show tables;
SELECT * FROM categoria_frase;
select * from palavra;
insert into cadastro (nome_usuario, senha) values ("teste", "123");
select * from cadastro;
