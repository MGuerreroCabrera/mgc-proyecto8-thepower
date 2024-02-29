// Importar librería mongoose
const mongoose = require("mongoose");

// Crear el Schema
const teamShechema = new mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        founded: { type: Number, required: true },
        crest: { type: String, required: true, trim: true },
        players: [{ type: mongoose.Types.ObjectId, ref: "players" }]
    }, 
    {
        timestamps: true,
        collection: "teams"
    });

// Crear el modelo
const Team = mongoose.model("teams", teamShechema, "teams");

// Exportar el modelo
module.exports = Team;