const playersRouter = require("./players");
const teamsRouter = require("./teams");
const usersRouter = require("./users");

// Crear enrutado principal
const mainRouter = require("express").Router();

// Rutas para los jugadores
mainRouter.use("/players", playersRouter);
// Rutas para los equipos
mainRouter.use("/teams", teamsRouter);
// Ruta para los usuarios
mainRouter.use("/users", usersRouter);

// Exportar enrutador principal
module.exports = mainRouter;