const { validationResult } = require("express-validator");

// next es un colba que indica a node que si todo sale bien, continue con el siguiente moddlewares
const validarCampos = (req, res, next) => {

  const errores = validationResult(req);

  if (!errores.isEmpty()) {

    return res.status(400).json({
      ok: false,
      errors: errores.mapped()
    });
  }
  //moverme al siguiente middlewares
  next();

}

module.exports = {
  validarCampos
}