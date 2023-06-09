const { Router } = require("express");
const { crearCategorias } = require("../controllers/categoriasController");

const router = Router();

router.post('/agregarCategoria',
crearCategorias
)

module.exports = router;
