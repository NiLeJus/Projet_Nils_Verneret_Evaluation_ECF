const jwt = require('jsonwebtoken');
const secretKey = "lQ68vvBzgiz$ZJSJbUDf";

// Vérifier le token de manière asynchrone
async function authenticateToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        try {
            // Envelopper jwt.verify dans une Promesse
            await new Promise((resolve, reject) => {
                jwt.verify(token, secretKey, (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            });
            next();
        } catch (err) {
            res.status(403).json({ message: 'Token invalide. Accès refusé.' });
        }
    } else {
        res.status(401).json({ message: 'Aucun token fourni. Accès refusé.' });
    }
}

module.exports = authenticateToken;

