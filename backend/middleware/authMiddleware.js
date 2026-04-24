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

        req.userId = decoded.id;
        next();
    });
};