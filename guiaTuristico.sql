drop database if exists guiaTuristico;
create database guiaTuristico;
use guiaTuristico;

/*início*/

CREATE TABLE cadastro (
    id_cadastro INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE login (
    id_login INT AUTO_INCREMENT PRIMARY KEY,
    id_cadastro INT,
    data_login DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cadastro) REFERENCES cadastro(id_cadastro)
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

CREATE TABLE parada_roteiro (
    id_parada INT AUTO_INCREMENT PRIMARY KEY,
    id_roteiro INT,
    horario TIME,
    nome_local VARCHAR(100),
    descricao TEXT,
    duracao VARCHAR(20),
    dica TEXT,
    FOREIGN KEY (id_roteiro) REFERENCES roteiro(id_roteiro)
);

