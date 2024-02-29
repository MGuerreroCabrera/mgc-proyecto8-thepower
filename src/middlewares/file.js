// Importar las librerías multer y cloudinary
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Crear el storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "La liga",
        allowedFormats: ["jpg", "jpeg", "png", "gif"]
    }
});

// Crear con multer el storage
const upload = multer({ storage });

// Exportar el upload
module.exports = upload;