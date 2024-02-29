// Crear la función que retorna un status, y un json resultado de la ejecución de una operación
const returnResult = (res, vStatus, vJson) => {
    return res.status(vStatus).json(vJson);
};

module.exports = { returnResult }