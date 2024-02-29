// Importar librería mongoose
const mongoose = require("mongoose");
// Importar librería bcrypt - Encripta contraseñas
const bcrypt = require("bcrypt");

// Crear el Schema
const userSchema = new mongoose.Schema(
    {
        userName: { type: String, trim: true, required: true },
        email: { type: String, trim: true, required: true },
        password: { type: String, trim: true, required: true },
        rol: { type: String, trim: true, required: true, enum: ["admin", "user"] }
    },
    {
        timestamps: true,
        collection: "users"
    });

// Encriptar la contraseña antes de guardar los datos del usuario
userSchema.pre("save", function(){
    this.password = bcrypt.hashSync(this.password, 10);
})

// Crear el modelo
const User = mongoose.model("users", userSchema, "users");

// Exportar el modelo
module.exports = User;