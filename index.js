// Importar librería express
const express = require("express");
// Importar la librería cloudinary
const cloudinary = require("cloudinary");
const { connectDB } = require("./src/config/db");
const mainRouter = require("./src/api/routes/main");
const playersRouter = require("./src/api/routes/players");

// Crear el servidor
const app = express();

// Conectar a la BBDD
connectDB();

// Indicar al servidor que puede recibir cuerpos en formato json
app.use(express.json());

// Configurar cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Rutas para los jugadores
app.use("/api/v1/", mainRouter);

// Controlar rutas de acceso no definidas
app.use("*", (req, res, next) => {
    return res.status(400).json("Route not found");
});

// Puerto de conexión
const PORT = 3000;

// Levantar el servidor
app.listen(PORT, () => {
    console.log("Servidor levantado en http://localhost:3000");
});