const { returnResult } = require("../../utils/returnResult");
const Team = require("../models/teams");

// Listado de registros
const getTeams = async (req, res, next) => {
    try {
        // Crear variable que contendrá los registros
        const teams = await Team.find().populate("players");
        // Devolver el resultado ok y listado de registros
        returnResult(res, 200, teams);
    } catch (error) {
        // Devolver resultado error
        returnResult(res, 400, error);
    }
};

// Nuevo registro
const postTeam = async (req, res, next) => {
    try {
        // Recoger los datos para el nuevo registro
        const newTeam = new Team(req.body);
        // Comprobar si existe un .file en la request
        if(req.file){
            newTeam.crest = req.file.path;
        }
        // Lanzar sentencia que inserta un registro
        const teamSaved = await newTeam.save();
        // Devolver resultado OK y el registro guardado
        returnResult(res, 201, teamSaved);
    } catch (error) {
        // Devolver resultado error
        returnResult(res, 400, error);
    }
};

// Actualizar registro
const putTeam = async (req, res, next) => {
    try {
        // Recoger el id del registro a actualizar
        const { id } = req.params;
        // Crear variable para contenido de jugadores
        const oldTeam = await Team.findById(id);
        // Crear variable con datos a actualizar
        const newTeam = new Team(req.body);
        // Poner el mismo id
        newTeam._id = id;
        // Recoger los jugadores que tenía si los tenía y creamos un array fusionando los datos nuevos que llegan con los que ya había.
        newTeam.players = [...oldTeam.players, ...req.body.players];
        // Lanzar sentencia para actualizar datos
        const teamUpdated = await Team.findByIdAndUpdate(id, newTeam, { new: true });
        // Devolver resultado ok y registro actualizado
        returnResult(res, 200, teamUpdated);
    } catch (error) {
        // Devolver resultado error
        returnResult(res, 400, error);
    }
};

// Eliminar registro
const deleteTeam = async (req, res, next) => {
    try {
        // Recoger el id del registro a eliminar
        const { id } = req.params;
        // Lanzar la sentencia de eliminar registro y guardar datos registro eliminado
        const teamDeleted = await Team.findByIdAndDelete(id);
        // Devolver resultado ok y registro eliminado
        returnResult(res, 200, teamDeleted);
    } catch (error) {
        // Devolver resultado error
        returnResult(res, 400, error);
    }
};

// Exportar métodos
module.exports = { getTeams, postTeam, putTeam, deleteTeam }