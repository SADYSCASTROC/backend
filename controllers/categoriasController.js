const Categoria = require("../models/category");



const crearCategorias = async (req, res = response) => {

    try {
        const { nombre } = req.body;

        //valido si la categoria ya exist
        const existeCategoria = await Categoria.findOne({ nombre });


        if (existeCategoria) {
            return res.status(400).json({
                ok: false,
                msg: 'La categoria ya esta registrada'
            });
        }

        const categoy = new Categoria(req.body);
        await categoy.save();

        res.json({
            ok: true,
            categoy
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
    crearCategorias
}
