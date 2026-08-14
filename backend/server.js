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


app.post('/roteiro/:id/comentarios', authMiddleware, async (req, res) => {
    const roteiroId = req.params.id;
    const { texto } = req.body;
    const usuarioId = req.userId; 

    if (!usuarioId) {
        return res.status(401).json({ erro: "Você precisa estar logado para comentar." });
    }

    if (!texto || !texto.trim()) {
        return res.status(400).json({ erro: "O comentário não pode ser vazio." });
    }

    try {
        await db.promise().query(
            `INSERT INTO comentarios (texto, roteiro_id, usuario_id, criado_em) 
             VALUES (?, ?, ?, NOW())`,
            [texto, roteiroId, usuarioId]
        );

        return res.status(201).json({ mensagem: "Comentário enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao inserir comentário:", error);
        return res.status(500).json({ erro: "Erro interno ao salvar o comentário." });
    }
});

app.post("/roteiro/:id/curtir", authMiddleware, (req, res) => {
  const roteiroId = req.params.id;
  const usuarioId = req.userId;

  // Usamos db.promise().query() para habilitar o uso de .then() e .catch()
  db.promise().query(
    "SELECT * FROM curtidas WHERE roteiro_id = ? AND usuario_id = ?",
    [roteiroId, usuarioId]
  )
  .then(([jaCurtiu]) => {
    if (jaCurtiu.length > 0) {
      // Se já curtiu, remove a curtida
      return db.promise().query(
        "DELETE FROM curtidas WHERE roteiro_id = ? AND usuario_id = ?",
        [roteiroId, usuarioId]
      ).then(() => res.json({ curtiu: false }));
    } else {
      // Se não curtiu, adiciona
      return db.promise().query(
        "INSERT INTO curtidas (roteiro_id, usuario_id) VALUES (?, ?)",
        [roteiroId, usuarioId]
      ).then(() => res.json({ curtiu: true }));
    }
  })
  .catch((error) => {
    console.error("Erro ao processar curtida:", error);
    res.status(500).json({ error: "Erro interno ao processar curtida." });
  });
});

app.get("/roteiro/:id/curtidas", authMiddleware, async (req, res) => {
    const roteiroId = req.params.id;
    const usuarioId = req.userId;
  
    try {
      const [[{ total }]] = await db.promise().query(
        "SELECT COUNT(*) AS total FROM curtidas WHERE roteiro_id = ?",
        [roteiroId]
      );
      const [jaCurtiu] = await db.promise().query(
        "SELECT 1 FROM curtidas WHERE roteiro_id = ? AND usuario_id = ?",
        [roteiroId, usuarioId]
      );
      res.json({ total, curtiu: jaCurtiu.length > 0 });
    } catch (error) {
      console.error("Erro ao buscar curtidas:", error);
      res.status(500).json({ erro: "Erro ao buscar curtidas." });
    }
  });

app.post("/roteiro/:id/favoritar", authMiddleware, async (req, res) => {
    const roteiroId = req.params.id;
    const usuarioId = req.userId;
  
    try {
      const [jaFavoritou] = await db.promise().query(
        "SELECT 1 FROM favoritos WHERE roteiro_id = ? AND usuario_id = ?",
        [roteiroId, usuarioId]
      );
  
      if (jaFavoritou.length > 0) {
        await db.promise().query(
          "DELETE FROM favoritos WHERE roteiro_id = ? AND usuario_id = ?",
          [roteiroId, usuarioId]
        );
        return res.json({ favoritou: false });
      } else {
        await db.promise().query(
          "INSERT INTO favoritos (roteiro_id, usuario_id) VALUES (?, ?)",
          [roteiroId, usuarioId]
        );
        return res.json({ favoritou: true });
      }
    } catch (error) {
      console.error("Erro ao favoritar:", error);
      res.status(500).json({ erro: "Erro ao favoritar roteiro." });
    }
  });
  
  // Status de favorito
  app.get("/roteiro/:id/favorito", authMiddleware, async (req, res) => {
    const roteiroId = req.params.id;
    const usuarioId = req.userId;
  
    try {
      const [rows] = await db.promise().query(
        "SELECT 1 FROM favoritos WHERE roteiro_id = ? AND usuario_id = ?",
        [roteiroId, usuarioId]
      );
      res.json({ favoritou: rows.length > 0 });
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
      res.status(500).json({ erro: "Erro ao verificar favorito." });
    }
  });

app.post("/roteiro/:id/avaliar", authMiddleware, (req, res) => {
console.log("DEBUG BACKEND:");
  console.log("ID da URL:", req.params.id);
  console.log("ID do usuário:", req.userId);
  console.log("Nota:", req.body.nota);
  // Converte para número e valida
  const roteiroId = parseInt(req.params.id);
  const usuarioId = req.userId; // Certifique-se que o middleware preenche isso
  const { nota } = req.body;

  // Validação simples
  if (isNaN(roteiroId)) {
    return res.status(400).json({ error: "ID de roteiro inválido." });
  }

  db.promise().query(
    "INSERT INTO avaliacoes (roteiro_id, usuario_id, nota) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE nota = ?",
    [roteiroId, usuarioId, nota, nota]
  )
  .then(() => {
    res.json({ message: "Avaliação registrada com sucesso!", nota });
  })
  .catch((error) => {
    console.error("Erro ao avaliar:", error);
    res.status(500).json({ error: "Erro ao salvar avaliação." });
  });
});
app.get("/roteiro/:id/avaliacoes", authMiddleware, async (req, res) => {
    const roteiroId = req.params.id;
    const usuarioId = req.userId;
  
    try {
      const [[{ media, total }]] = await db.promise().query(
        "SELECT AVG(nota) AS media, COUNT(*) AS total FROM avaliacoes WHERE roteiro_id = ?",
        [roteiroId]
      );
      const [minhaNota] = await db.promise().query(
        "SELECT nota FROM avaliacoes WHERE roteiro_id = ? AND usuario_id = ?",
        [roteiroId, usuarioId]
      );
      res.json({
        media: media ? Number(media).toFixed(1) : null,
        total,
        notaUsuario: minhaNota.length > 0 ? minhaNota[0].nota : null
      });
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      res.status(500).json({ erro: "Erro ao buscar avaliações." });
    }
  });

app.get('/roteiro/:id/comentarios', async (req, res) => {
    const roteiroId = req.params.id;
    try {
        const [comentarios] = await db.promise().query(
            `SELECT c.id, c.texto, c.criado_em, u.nome_usuario 
             FROM comentarios c
             JOIN cadastro u ON c.usuario_id = u.id_cadastro
             WHERE c.roteiro_id = ?
             ORDER BY c.criado_em DESC`,
            [roteiroId]
        );
        return res.json(comentarios);
    } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        return res.status(500).json({ erro: "Erro ao buscar os comentários." });
    }
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

    const { pt, es } = req.body;

    const sql = `
        UPDATE frase
        SET pt = ?, es = ?
        WHERE id_frase = ?
    `;

    db.query(sql, [pt, es, id], (erro) => {

        if (erro) {
            console.error("Erro ao editar frase:", erro);
            return res.status(500).json({
                erro: "Erro ao editar frase"
            });
        }

        res.json({
            mensagem: "Frase atualizada"
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



/* --------- GET /vivencias -> lista tudo, já organizado em árvore --------- */
app.get("/vivencias", (req, res) => {
  const sql = `
      SELECT
          v.id_vivencia,
          v.usuario_id,
          v.parent_id,
          v.tipo,
          v.texto,
          v.criado_em,
          c.nome_usuario
      FROM vivencias v
      JOIN cadastro c ON c.id_cadastro = v.usuario_id
      ORDER BY v.criado_em ASC
  `;

  db.query(sql, (err, result) => {
      if (err) {
          console.error("ERRO NO BANCO:", err.sqlMessage);
          return res.status(500).json({ erro: "Erro ao buscar vivências." });
      }

      res.json(montarArvoreVivencias(result));
  });
});

/* --------- POST /vivencias -> cria um comentário/sugestão raiz --------- */
app.post("/vivencias", authMiddleware, (req, res) => {
  const { texto, tipo } = req.body;
  const usuario_id = req.userId;

  if (!texto || !texto.trim()) {
      return res.status(400).json({ erro: "O texto não pode ser vazio." });
  }

  const tipoFinal = tipo === "sugestao" ? "sugestao" : "experiencia";

  const sql = `
      INSERT INTO vivencias (usuario_id, parent_id, tipo, texto)
      VALUES (?, NULL, ?, ?)
  `;

  db.query(sql, [usuario_id, tipoFinal, texto.trim()], (err, result) => {
      if (err) {
          console.error("ERRO NO BANCO:", err.sqlMessage);
          return res.status(500).json({ erro: "Erro ao salvar vivência." });
      }

      res.status(201).json({
          mensagem: "Vivência publicada com sucesso!",
          id_vivencia: result.insertId
      });
  });
});

/* --------- POST /vivencias/:id/responder -> cria uma resposta --------- */
app.post("/vivencias/:id/responder", authMiddleware, (req, res) => {
  const parentId = req.params.id;
  const { texto } = req.body;
  const usuario_id = req.userId;

  if (!texto || !texto.trim()) {
      return res.status(400).json({ erro: "O texto não pode ser vazio." });
  }

  // confirma que o comentário-pai existe antes de responder
  db.query(
      "SELECT id_vivencia, tipo FROM vivencias WHERE id_vivencia = ?",
      [parentId],
      (err, result) => {
          if (err) {
              console.error("ERRO NO BANCO:", err.sqlMessage);
              return res.status(500).json({ erro: "Erro ao verificar comentário." });
          }

          if (result.length === 0) {
              return res.status(404).json({ erro: "Comentário não encontrado." });
          }

          const tipoHerdado = result[0].tipo;

          const sql = `
              INSERT INTO vivencias (usuario_id, parent_id, tipo, texto)
              VALUES (?, ?, ?, ?)
          `;

          db.query(
              sql,
              [usuario_id, parentId, tipoHerdado, texto.trim()],
              (err, result) => {
                  if (err) {
                      console.error("ERRO NO BANCO:", err.sqlMessage);
                      return res.status(500).json({ erro: "Erro ao salvar resposta." });
                  }

                  res.status(201).json({
                      mensagem: "Resposta publicada com sucesso!",
                      id_vivencia: result.insertId
                  });
              }
          );
      }
  );
});


app.delete("/vivencias/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const usuario_id = req.userId;

  const sql = `
      DELETE FROM vivencias
      WHERE id_vivencia = ?
      AND usuario_id = ?
  `;

  db.query(sql, [id, usuario_id], (err, result) => {
      if (err) {
          console.error("ERRO NO BANCO:", err.sqlMessage);
          return res.status(500).json({ erro: "Erro ao excluir." });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({
              erro: "Vivência não encontrada ou sem permissão para excluir."
          });
      }

      res.json({ mensagem: "Vivência excluída com sucesso!" });
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