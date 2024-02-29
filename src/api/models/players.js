// Importar librería mongoose
const mongoose = require("mongoose");

// Crear el schema
const playerSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true },
    yearOfBirth: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    verified: { type: Boolean, required: true}
}, 
{
    timestamps: true,
    collection: "players"
});

// Crear el modelo
const Player = mongoose.model("players", playerSchema, "players");

// Exportar el modelo
module.exports = Player;