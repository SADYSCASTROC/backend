const jwt = require("jsonwebtoken");


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const paiload = { uid }

        jwt.sign(paiload, process.env.JWT_KEY, {
            expiresIn: '1h'

        }, (err, token) => {

            if (err) {
                reject('No se pudo generar JWT')

            } else {
                resolve(token)
            }

        })
    })
}

module.exports = {
    generarJWT
}