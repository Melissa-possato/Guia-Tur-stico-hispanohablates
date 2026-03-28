const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ifsp",
    database: "guiaTuristico",
    port: 3306
});

conexao.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL!");
});

module.exports = conexao;
