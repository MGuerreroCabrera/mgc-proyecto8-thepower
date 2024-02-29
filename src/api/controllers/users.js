const { generateSign } = require("../../config/jwt");
const { returnResult } = require("../../utils/returnResult");
const User = require("../models/users");

// Importar librería bcrypt
const bcrypt = require("bcrypt");

// Listado de registros
const getUsers = async (req, res, next) => {
    try {
        // Lanzar sentencia que obtiene los registros
        const users = await User.find();
        // Devolver resultado OK y listado de registros
        returnResult(res, 200, users);
    } catch (error) {
        // Devolver estado 400 y error
        returnResult(res, 400, error);
    }
}; 

// Crear registro
const register = async (req, res, next) => {
    try {
        // Crear nuevo usuario con datos recibidos
        const newUser = new User
        (
        {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            rol: "user"
        }
        );
        // Comprobar duplicidad del userName
        const duplicatedUserName = await User.findOne({ userName: req.body.userName });
        // Si la dirección de correo existe devolver error y mensaje
        if(duplicatedUserName){
            return res.status(400).json("Ya existe la dirección de correo electrónico en la BBDD");
        }
        // Lanzar la sentencia para guardar los datos
        const userSaved = await newUser.save();
        // Devolver resultado OK y el registro guardado
        returnResult(res, 201, userSaved);
    } catch (error) {
        // Devolver estado 400 y error
        returnResult(res, 400, error);
    }
};

// Función para hacer login
const login = async (req, res, next) => {
    try {
        // Comprobar que la cuenta de correo exista en la BBDD
        //const email = req.body.email;
        const user = await User.findOne({ email: req.body.email });
        // Si no existe devolver error y mensaje
        if(!user){
            returnResult(res, 400, "Los datos  introducidos no se encuentran registrados en la BBDD");
        }
        // Comprobar contraseña
        if(bcrypt.compareSync(req.body.password, user.password)){            
            // Crear el token
            const token = generateSign(user._id);
            // Devolver resultado OK, usuario y token generado
            return res.status(200).json({ user, token });
        }else{
            // Devolver mensaje de datos incorrectos
            return res.status(400).json("Usuario o contraseña incorrectos");
        }
    } catch (error) {
        // Devolver estado 400 y error
        returnResult(res, 400, error);
    }
};

// Actualizar registro. Do admin
const doAdmin = async (req, res, next) => {
    try {
        // Recoger el id del registro a actualizar
        const { id } = req.params;
        // Crear variable con datos a actualizar
        const userToAdmin = new User({ rol: "admin" });
        // Poner el  mismo id
        userToAdmin._id = id;
        // Lanza la sentencia para actualiza el resgistro
        const userUpdated = await User.findByIdAndUpdate(id, userToAdmin, { new: true });
        // Devolver resultado ok y registro actualizado
        returnResult(res, 200, userUpdated);
    } catch (error) {
        // Devolver estado 400 y error
        returnResult(res, 400, error);
    }
};

// Eliminar registro
const deleteUser = async (req, res, next) => {
    try {
        // Recoger el id del registro a eliminar
        const { id } = req.params;
        // Lanzar la sentencia para eliminar el registro
        const userDeleted = await User.findByIdAndDelete(id);
        // Devolver resultado ok y registro eliminado
        returnResult(res, 200, userDeleted);
    } catch (error) {
        // Devolver estado 400 y error
        returnResult(res, 400, error);
    }
};

// Exportar funciones
module.exports = { getUsers, register, doAdmin, deleteUser, login }