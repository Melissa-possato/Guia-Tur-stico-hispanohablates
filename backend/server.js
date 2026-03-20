const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* 
   CADASTRO
 */

app.post("/cadastro", (req, res) => {

    const { nome_usuario, senha } = req.body;

    const sql = `
        INSERT INTO cadastro (nome_usuario, senha)
        VALUES (?, ?)
    `;

    db.query(sql, [nome_usuario, senha], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({ mensagem: "Usuário cadastrado!" });

    });

});

app.get("/cadastro", (req, res) => {

    const sql = "SELECT * FROM cadastro";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

/* 
   LOGIN
 */

app.post("/login", (req, res) => {

    const { nome_usuario, senha } = req.body;

    const sql = `
        SELECT * FROM cadastro
        WHERE nome_usuario = ? AND senha = ?
    `;

    db.query(sql, [nome_usuario, senha], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {

            const id = result[0].id_cadastro;

            db.query(
                "INSERT INTO login (id_cadastro) VALUES (?)",
                [id]
            );

            res.json({ login: true, usuario: result[0] });

        } else {

            res.json({ login: false });

        }

    });

});

/* 
   MAPA
 */

app.post("/mapa", (req, res) => {

    const { id_cadastro, nome_local, latitude, longitude } = req.body;

    const sql = `
        INSERT INTO mapa
        (id_cadastro, nome_local, latitude, longitude)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [id_cadastro, nome_local, latitude, longitude], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({ mensagem: "Local salvo!" });

    });

});

app.get("/mapa", (req, res) => {

    const sql = "SELECT * FROM mapa";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

/*
   ROTEIROS
 */

app.post("/roteiro", (req, res) => {

    const {
        id_cadastro,
        titulo,
        descricao,
        duracao_horas,
        dificuldade,
        preco_estimado,
        categoria,
        avaliacao
    } = req.body;

    const sql = `
        INSERT INTO roteiro
        (id_cadastro, titulo, descricao, duracao_horas, dificuldade, preco_estimado, categoria, avaliacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        id_cadastro,
        titulo,
        descricao,
        duracao_horas,
        dificuldade,
        preco_estimado,
        categoria,
        avaliacao
    ], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({ mensagem: "Roteiro criado!" });

    });

});

app.get("/roteiro", (req, res) => {

    const sql = "SELECT * FROM roteiro";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

/* 
   PARADAS DO ROTEIRO
 */

app.post("/parada", (req, res) => {

    const {
        id_roteiro,
        horario,
        nome_local,
        descricao,
        duracao,
        dica
    } = req.body;

    const sql = `
        INSERT INTO parada_roteiro
        (id_roteiro, horario, nome_local, descricao, duracao, dica)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        id_roteiro,
        horario,
        nome_local,
        descricao,
        duracao,
        dica
    ], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({ mensagem: "Parada adicionada!" });

    });

});

app.get("/parada/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT * FROM parada_roteiro
        WHERE id_roteiro = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});




app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});