// Importar la librería jsonwebtoken
const jwt = require("jsonwebtoken");

// Crear la función que devuelve un token a partir del id de un usuario
const generateSign = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1w" });
};
// Crear función que comprueba que nosotros hemos creado el token
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

// Exportar la función generateSign
module.exports = { generateSign, verifyJwt }