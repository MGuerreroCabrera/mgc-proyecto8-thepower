const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");
const { returnResult } = require("../utils/returnResult");

// Crear función que valida si el usuario es administrador
const isAdmin = async (req, res, next) => {
    try {
        // Coger el token de las autorización de las headers
        const token = req.headers.authorization;
        // Si no hay token no está autorizado
        if(!token){
            returnResult(res, 400, "Usuario no autorizado ❌");
        }
        // Parsear el token eliminando "Bearer "
        const parsedToken = token.replace("Bearer ", "");
        // Validar el token parseado con la clave secreta del .env y obtener el id del usuario
        const { id } = verifyJwt(parsedToken);
        // Buscar el usuario por id en la BBDD
        const userLoged = await User.findById(id);
        // Comprobar si el usuario es administrador
        if(userLoged.rol === "admin"){
            // Ponemos el password a null
            userLoged.password = null;
            // Asignar el usuario logeado al cuerpo de le petición
            req.user = userLoged;
            // Seguimos con lo siguiente que haya que hacer
            next();
        }else{
            returnResult(res, 400, "Operación reservada a administradores");
        }
        
    } catch (error) {
        // Devolver resultado KO y mensaje
        returnResult(res, 400, error);
    }
}

// Crear función que valida si el usuario está registrado
const isRegistered = async (req, res, next) => {
    try {
        // Coger el token de la autorización de las headers
        const token = req.headers.authorization;
        // Si no hay token no está autorizado
        if(!token){
            returnResult(res, 400, "Usuario no autorizado ❌");
        }
        // Parsear el token
        const parsedToken = token.replace("Bearer ", "");
        // Obtenermos el id del usuario tras pasar el token parseado por la función verifyJwt
        const { id } = verifyJwt(parsedToken);
        // Buscar el usuario en la BBDD por su id
        const userLoged = await User.findById(id);
        // Poner el password a null
        userLoged.password = null
        // Poner los datos del usuario en el cuerpo de la petición
        req.user = userLoged;
        // Pasar a lo siguiente que haya que hacer / abrir la puerta
        next();
    } catch (error) {
        // Devolver resultado KO y mensaje
        returnResult(res, 400, error);
    }
}

// Exportar los métodos
module.exports = { isAdmin, isRegistered }