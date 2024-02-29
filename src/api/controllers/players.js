const Player = require("../models/players");
const { returnResult } = require("../../utils/returnResult");
const playersRouter = require("../routes/players");

// Listado de registros
const getPlayers = async (req, res, next) => {
    try {
        // Crear variable que contendrá los registros
        const players = await Player.find();
        // Devolver listado de registros
        returnResult(res, 200, players);
    } catch (error) {
        returnResult(res, 400, error);
    }
};

// Listado de registros verificados
const getVerifiedPlayers = async (req, res, next) => {
    try {
        // Crear la variable que contendrá el listado de registros
        const verifiedPlayers = await Player.find({ verified: true });
        // Devolver el resultado OK y listado de registros
        returnResult(res, 200, verifiedPlayers);
    } catch (error) {
        returnResult(res, 400, error);
    }
};

// Listado de registros no verificados
const getNotVerifiedPlayers = async (req, res, next) => {
    try {
        // Crear la variable que contendrá el listado de registros
        const notVerifiedPlayers = await Player.find({ verified: false });
        // Devolver el resulado OK y listado de registros
        returnResult(res, 200, notVerifiedPlayers);
    } catch (error) {
        returnResult(res, 400, error);
    }
};

// Crear registro
const postPlayer = async (req, res, next) => {
    try {
        // Crear la variable que contiene los datos del nuevo registro
        const newPlayer = new Player(req.body);
        // Comprobar  si el usuario que da de alta el jugador es admin para poner automáticamente el verified a true
        if(req.user.rol === "admin"){
            newPlayer.verified = true;
        }else{
            newPlayer.verified = false;
        }
        // Comprobar si existe un .file en la request
        if(req.file){
            newPlayer.image = req.file.path;
        }
        // Lanzar la petición para guardar el registro
        const playerSaved = await newPlayer.save();
        // Devolver el resultado ok y el registro guardado
        returnResult(res, 201, playerSaved);
    } catch (error) {
        returnResult(res, 400, error);
    }
};

// Actualizar registro
const putPlayer = async (req, res, next) => {
    try {
        // Obtener el id del registro a actualizar
        const { id } = req.params;
        // Crear la variable con los datos a actualizar
        const newPlayer = new Player(req.body);
        // Poner el mismo id al nuevo registro
        newPlayer._id = id;
        // Lanzar la sentencia para actualizar el registro
        const playerUpdated = await Player.findByIdAndUpdate(id, newPlayer, { new: true });
        // Devolver resutado ok y datos actualizados
        returnResult(res, 200, playerUpdated);
    } catch (error) {
        returnResult(res, 400, error);
    }
};

// Verificar jugador
const verifyPlayer = async (req, res, next) => {
    try {
        // Recoger el id del jugador a verificar
        const { id } = req.params;
         // Crear variable con datos a actualizar
         const playerVerified = new Player({ verified: true });
         // Poner el  mismo id
         playerVerified._id = id;
         // Lanza la sentencia para actualiza el resgistro
         const playerUpdated = await Player.findByIdAndUpdate(id, playerVerified, { new: true });
         // Devolver resultado ok y registro actualizado
         returnResult(res, 200, playerUpdated);
    } catch (error) {
        returnResult(res, 400, error);
    }
};

// Elimnar registro
const deletePlayer = async (req, res, next) => {
    try {
        // Obtener el id del registro a eliminar
        const { id } = req.params;
        // Lanzar la sentencia de eliminar registro
        const playerDeleted = await Player.findByIdAndDelete(id);
        // Devolver resultado ok y datos del registro eliminado
        returnResult(res, 200, playerDeleted);
    } catch (error) {
        returnResult(res, 400, error);
    }
};

// Exportar los métodos
module.exports = { getPlayers, getVerifiedPlayers, getNotVerifiedPlayers, postPlayer, putPlayer, verifyPlayer, deletePlayer }