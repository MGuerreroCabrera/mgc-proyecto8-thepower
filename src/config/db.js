// Importar librería mongoose
const mongoose = require("mongoose");
// Configurar dotenv para poder acceder a las variables de entorno
require("dotenv").config();

// Crear función de conexión a la BBDD
const connectDB = async() => {
    try {
        // Conectar con la BBDD
        await mongoose.connect(process.env.DB_URL);
        // Mostrar mensaje de conexión OK
        console.log("Conectado con éxito a la BBDD 👌")
    } catch (error) {
        // Devolver el error
        console.log(error);
    }
}

// Exportar función de conexión
module.exports = { connectDB }