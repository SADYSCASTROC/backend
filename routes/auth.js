const { Router } = require('express');
const { check } =  require ('express-validator');
const { crearUsuario, ingrsoDeUsuario } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');

//function 
const router = Router();

router.post('/crearUsuario',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    validarCampos
] ,crearUsuario);

router.post('/ingresoDeUsuario',ingrsoDeUsuario)

module.exports = router;