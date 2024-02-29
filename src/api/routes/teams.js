const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getTeams, postTeam, putTeam, deleteTeam } = require("../controllers/teams");

// Importar Router de la librería express
const teamsRouter = require("express").Router();

// Ruta para listado de registros
teamsRouter.get("/", getTeams);

// Ruta para insertar registro
teamsRouter.post("/", [isAdmin], upload.single("crest"), postTeam);

// Ruta para actualizar un registro
teamsRouter.put("/:id", [isAdmin], putTeam);

// Ruta para eliminar un registro
teamsRouter.delete("/:id", [isAdmin], deleteTeam);

// Exportar enrutador
module.exports = teamsRouter;