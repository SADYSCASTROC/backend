const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {

    try {
        const { email, password } = req.body;

        //valido si el email ya exist
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        //Guardar registro db
        await usuario.save();
        //crear JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



const ingrsoDeUsuario = async (req, res = response) => {

    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        // console.log(usuario)

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El email no encontrado'
            });
        }

        //validar password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        // console.log(validPassword)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }

        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    crearUsuario,
    ingrsoDeUsuario
}

