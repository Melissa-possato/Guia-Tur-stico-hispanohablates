drop database if exists guiaTuristico;
create database guiaTuristico;
use guiaTuristico;


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

CREATE TABLE mapa (
    id_mapa INT AUTO_INCREMENT PRIMARY KEY,
    id_cadastro INT,
    nome_local VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    data_busca DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cadastro) REFERENCES cadastro(id_cadastro)
);

