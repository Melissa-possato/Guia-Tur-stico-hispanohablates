const express = require("express");
const cors = require("cors");
const db = require("./db");

const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware'); 
const SECRET = "MINHA_CHAVE_SECRETA_123";

const app = express();

app.use(cors());
app.use(express.json());

/* 
   CADASTRO
 */

app.post("/cadastro", (req, res) => {
    const { nome_usuario, email, senha } = req.body;

    console.log(`Tentativa de cadastro: ${nome_usuario} - ${email}`);
    const sql = "INSERT INTO cadastro (nome_usuario, email, senha) VALUES (?, ?, ?)";

    db.query(sql, [nome_usuario, email, senha], (err, result) => {
        if (err) {
            console.error("ERRO NO BANCO:", err.sqlMessage);
            

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: "Usuário ou E-mail já cadastrados!" });
            }

            return res.status(500).json({ message: "Erro ao salvar no banco", detalhes: err.sqlMessage });
        }

        res.json({ message: "Usuário cadastrado com sucesso!" });
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
    const sql = "SELECT * FROM cadastro WHERE nome_usuario = ? AND senha = ?";

    db.query(sql, [nome_usuario, senha], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
            const id = result[0].id_cadastro;
            
            // Criamos o token que expira em 1 hora
            const token = jwt.sign({ id }, SECRET, { expiresIn: 3600 });

            return res.json({ login: true, token: token, usuario: result[0] });
        } else {
            res.json({ login: false, mensagem: "Usuário ou senha incorretos" });
        }
    });
});

/* 
   MAPA
 */

// Exemplo: Rota de mapa protegida
app.post("/mapa", authMiddleware, (req, res) => {
    // Agora você tem acesso ao id do usuário logado via req.userId
    const { nome_local, latitude, longitude } = req.body;
    const id_cadastro = req.userId; 

    const sql = "INSERT INTO mapa (id_cadastro, nome_local, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(sql, [id_cadastro, nome_local, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: "Local salvo com segurança!" });
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

   app.get("/roteiro", authMiddleware, (req, res) => {

    const sql = `SELECT * FROM roteiro`;

    db.query(sql, (err, result) => {

        if (err) {
            console.error("ERRO NO BANCO:", err.sqlMessage);
            return res.status(500).json(err);
        }

        res.json(result); 

    });

});
app.post("/cadastrarRoteiro", authMiddleware, (req, res) => {

    const {
        titulo,
        descricao,
        duracao_horas,
        dificuldade,
        preco_estimado,
        categoria,
        avaliacao
    } = req.body;

    const id_cadastro = req.userId; 

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
            console.error("ERRO NO BANCO:", err.sqlMessage);
            return res.status(500).json(err);
        }

        res.json({
            mensagem: "Roteiro criado!",
            id_roteiro: result.insertId
        });

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