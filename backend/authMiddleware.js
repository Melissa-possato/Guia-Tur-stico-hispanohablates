const jwt = require('jsonwebtoken');

const SECRET = "MINHA_CHAVE_SECRETA_123";

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ auth: false, message: 'Token não fornecido.' });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ auth: false, message: 'Token inválido.' });
        }

        // Mantém o que você já tinha (para não quebrar outras rotas do seu sistema)
        req.userId = decoded.id;

        // ADICIONE ESTA LINHA: Cria o objeto req.user para as novas rotas funcionarem!
        req.user = { id: decoded.id };

        next();
    });
};