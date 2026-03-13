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


<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4400.153632494484!2d-47.88077875768632!3d-21.97014521486421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8711e71fe250f%3A0xf5c8879e76e658c4!2sInstituto%20Federal%20de%20Educa%C3%A7%C3%A3o%2C%20Ci%C3%AAncia%20e%20Tecnologia%20de%20S%C3%A3o%20Paulo%2C%20Campus%20S%C3%A3o%20Carlos!5e0!3m2!1spt-BR!2sbr!4v1773414230147!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

