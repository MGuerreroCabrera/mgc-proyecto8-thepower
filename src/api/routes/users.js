const { isAdmin } = require("../../middlewares/auth");
const { getUsers, register, doAdmin, deleteUser, login } = require("../controllers/users");

// Importar función Router de express
const usersRouter = require("express").Router();


// Ruta para listado de registros
usersRouter.get("/", getUsers);

// Ruta para crear un usuario
usersRouter.post("/", register);

// Ruta para pasar un usuario a Admin
usersRouter.put("/doadmin/:id", doAdmin);

// Ruta para eliminar un registro
usersRouter.delete("/:id", [isAdmin], deleteUser);

// Ruta para hacer login
usersRouter.post("/login", login);

// Exportar enrutador
module.exports = usersRouter;