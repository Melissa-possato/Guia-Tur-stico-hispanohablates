const express = require("express");
const cors = require("cors");
const db = require("./db");

const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware'); 
const conexao = require("./db");
const SECRET = "MINHA_CHAVE_SECRETA_123";

const app = express();

app.use(cors());
app.use(express.json());

/* 
   CADASTRO
 */

app.post("/cadastro", (req, res) => {
    const { nome_usuario, telefone, email, origem, senha } = req.body;

    console.log(`Tentativa de cadastro: ${nome_usuario} - ${email}`);
    const sql = "INSERT INTO cadastro (nome_usuario, telefone, email, origem, senha) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [nome_usuario, telefone, email, origem, senha], (err, result) => {
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
            
            const token = jwt.sign({ id }, SECRET, { expiresIn: 3600 });

            return res.json({ login: true, token: token, usuario: result[0] });
        } else {
            res.json({ login: false, mensagem: "Usuário ou senha incorretos" });
        }
    });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;

  const {
    nome_usuario,
    telefone,
    email,
    origem,
    senha,
  } = req.body;

  console.log("Dados recebidos:", req.body);

  const sql = `
    UPDATE cadastro
      nome_usuario = ?,
      telefone = ?,
      email = ?,
      origem = ?,
      senha = ?
    WHERE id_cadastro = ?
  `;

  conexao.query(
    sql,
    [
      nome_usuario,
      telefone,
      email,
      origem,
      senha,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Erro MySQL:", err);
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      res.json({ message: "Dados atualizados com sucesso!" });
    }
  );
});

/* 
   MAPA
 */


app.post("/mapa", authMiddleware, (req, res) => {
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

app.delete("/roteiro/:id", authMiddleware, (req, res) => {

    const { id } = req.params;

    const id_cadastro = req.userId;

    const sql = `
        DELETE FROM roteiro
        WHERE id_roteiro = ?
        AND id_cadastro = ?
    `;

    db.query(sql, [id, id_cadastro], (err, result) => {

        if (err) {
            console.error("ERRO AO EXCLUIR:", err.sqlMessage);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Roteiro não encontrado ou sem permissão"
            });
        }

        res.json({
            mensagem: "Roteiro excluído com sucesso!"
        });

    });

});


//FRASES
app.get("/frases", async (req, res) => {

    try {

        const categorias = await queryPromise(
            "SELECT * FROM categoria_frase"
        );

        let resultado = {};

        for (const categoria of categorias) {

            const frases = await queryPromise(`
                SELECT id_frase, pt, es
                FROM frase
                WHERE id_categoria = ?
            `, [categoria.id_categoria]);

            const palavras = await queryPromise(`
                SELECT pt, es
                FROM palavra
                WHERE id_categoria = ?
            `, [categoria.id_categoria]);

            const passos = await queryPromise(`
                SELECT  id_passo, descricao
                FROM passo
                WHERE id_categoria = ?
                ORDER BY ordem_passo
            `, [categoria.id_categoria]);

            resultado[categoria.nome] = {
                id_categoria: categoria.id_categoria,
                frases,
                palavras,
                passos
            };
        }

        res.json(resultado);

    } catch (erro) {

        console.error("ERRO COMPLETO:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
});
app.put("/frase/:id", (req, res) => {

    const { id } = req.params;

    const { descricao } = req.body;

    const sql = `
        UPDATE frase
        SET descricao = ?
        WHERE id_frase = ?
    `;

    db.query(sql, [descricao, id], (erro) => {

        if (erro) {

            return res.status(500).json({
                erro: "Erro ao editar passo"
            });

        }

        res.json({
            mensagem: "Frase atualizado"
        });

    });

});

app.post("/adicionarPasso", (req, res) => {

    const {
        id_categoria,
        descricao,
        ordem_passo
    } = req.body;

    console.log(req.body);

    if (
        !id_categoria ||
        !descricao ||
        !ordem_passo
    ) {

        return res.status(400).json({
            erro: "Dados inválidos"
        });

    }

    const sql = `
        INSERT INTO passo
        (id_categoria, descricao, ordem_passo)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [id_categoria, descricao, ordem_passo],
        (erro, resultado) => {

            if (erro) {

                console.log("ERRO MYSQL:");
                console.log(erro);

                return res.status(500).json({
                    erro: "Erro ao adicionar passo"
                });

            }

            console.log("PASSO INSERIDO");

            res.status(201).json({
                mensagem: "Passo adicionado com sucesso",
                id: resultado.insertId
            });

        }
    );

});



function queryPromise(sql, valores = []) {

    return new Promise((resolve, reject) => {

        conexao.query(sql, valores, (err, results) => {

            if (err) {
                reject(err);
            } else {
                resolve(results);
            }

        });

    });

}

app.delete("/passo/:id", (req, res) => {
    const { id } = req.params;
  
    const sql = `
      DELETE FROM passo
      WHERE id_passo = ?
    `;
  
    db.query(sql, [id], (erro) => {
      if (erro) {
        return res.status(500).json({
          erro: "Erro ao excluir passo"
        });
      }
  
      res.json({
        mensagem: "Passo excluído com sucesso"
      });
    });
  });

  
app.put("/passo/:id", (req, res) => {

    const { id } = req.params;

    const { descricao } = req.body;

    const sql = `
        UPDATE passo
        SET descricao = ?
        WHERE id_passo = ?
    `;

    db.query(sql, [descricao, id], (erro) => {

        if (erro) {

            return res.status(500).json({
                erro: "Erro ao editar passo"
            });

        }

        res.json({
            mensagem: "Passo atualizado"
        });

    });

});

app.post("/adicionarFrase", (req, res) => {

    const {
        id_categoria,
        pt,
        es,
    } = req.body;

    console.log(req.body);

    if (
        !id_categoria ||
        !pt ||
        !es
    ) {

        return res.status(400).json({
            erro: "Dados inválidos"
        });

    }

    const sql = `
        INSERT INTO frase
        (id_categoria, pt, es)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [id_categoria, pt, es],
        (erro, resultado) => {

            if (erro) {

                console.log("ERRO MYSQL:");
                console.log(erro);

                return res.status(500).json({
                    erro: "Erro ao adicionar frase"
                });

            }

            console.log("Frase Inserida");

            res.status(201).json({
                mensagem: "Frase adicionada com sucesso",
                id: resultado.insertId
            });

        }
    );

});
app.put("/frase/:id", (req, res) => {

    const { id } = req.params;
    const { pt, es } = req.body;

    console.log("ID:", id);
    console.log("BODY:", req.body);

    const sql = `
        UPDATE frase
        SET pt = ?, es = ?
        WHERE id_frase = ?
    `;

    db.query(sql, [pt, es, id], (erro) => {

        if (erro) {

            console.log("ERRO MYSQL:", erro);

            return res.status(500).json({
                erro: erro.sqlMessage,
                codigo: erro.code,
                errno: erro.errno
        });
        

}

        res.json({
            mensagem: "Frase atualizada"
        });
    });

});

app.delete("/frase/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM frase
        WHERE id_frase = ?
    `;

    db.query(sql, [id], (erro) => {

        if (erro) {

            return res.status(500).json({
                erro: "Erro ao excluir passo"
            });

        }

        res.json({
            mensagem: "Frase excluída com sucesso"
        });

    });

});

app.get("/eventos", (req, res) => {

    const sql = "SELECT * FROM evento";
  
    db.query(sql, (err, result) => {
  
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  
      res.json(result);
    });
  });
app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
    
});
