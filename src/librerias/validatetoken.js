const jwt = require('jsonwebtoken');

// Se valida el token con la palabra BEARER $X-APP-TOKEN
exports.tokenValidations = async (req, res, next) => {
    const token = req.header('X-APP-TOKEN');
    if (!token) return res.status(401).json('Access denied');
    const split = token.split(" ");
    try {
        const payload = await jwt.verify(split[1], process.env.SECRET_KEY || 'token_user');
        req.user = payload;
        next();
    } catch (err) {
        res.status(400).send('Usuario incorrecto o no autenticado')
    }

}

exports.generateToken = (payload) => {
    const token = jwt.sign({
        id: payload.id,
        name: payload.name,
        email: payload.email
    }, process.env.SECRET_KEY || 'token_user');
    return token;
}
