const { isRegistered, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { postPlayer, putPlayer, deletePlayer, getPlayers, verifyPlayer, getVerifiedPlayers, getNotVerifiedPlayers } = require("../controllers/players");

// Importar la librería express - Router
const playersRouter = require("express").Router();

// Ruta para obtener el listado de registros
playersRouter.get("/", [isAdmin], getPlayers);

// Ruta para el listado de registros verificados
playersRouter.get("/verified", getVerifiedPlayers);

// Ruta para el listado de regisgtros no verificados
playersRouter.get("/not-verified", [isAdmin], getNotVerifiedPlayers);

// Ruta para crear registro
playersRouter.post("/", [isRegistered], upload.single("image"), postPlayer);

// Ruta para actualizar un registro
playersRouter.put("/:id",[isAdmin], putPlayer);

// Ruta para verificar un jugador
playersRouter.put("/verify/:id", [isAdmin], verifyPlayer);

// Ruta para eliminar un registro
playersRouter.delete("/:id", [isAdmin], deletePlayer);

// Exportar enrutador
module.exports = playersRouter;