const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res= response) => {

    try {
        const { email, password } = req.body;

        //valido si el email ya exist
        const existeEmail =  await Usuario.findOne({ email });

        if(existeEmail){
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



const ingrsoDeUsuario = async (req, res= response) => {

    console.log(req.body);

    return res.status(200).json({
        ok: true,
        msg: 'exitoso',
        data: req.body
    });

}

module.exports = {
    crearUsuario,
    ingrsoDeUsuario
}
