const jwt = require('jsonwebtoken');

const SECRET = "MINHA_CHAVE_SECRETA_123"; // No futuro, use um arquivo .env

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
        }

        // Se estiver tudo ok, salva o id para uso posterior e segue em frente
        req.userId = decoded.id;
        next();
    });
};