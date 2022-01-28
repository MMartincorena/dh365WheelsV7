const { validationResult } = require('express-validator')
const db = require('../database/models');
const { auto } = require('./adminController');

const Op = db.Sequelize.Op;


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Autos = db.Auto;



const productsController = {
   list: async(req, res) => {
      db.Autos.findAll()
          .then(autos => {
              res.render('products/desProducto', { autos })
          })
          .catch(error => res.send(error));
    },
    show: (req, res) => {
        db.Autos.findByPk(req.params.id)
        .then(miAuto => {
            res.render('products/productDetail', { miAuto });
        })
        .catch(error => res.send(error));

    },

    cart: (req, res) => {
        res.render('products/productCart')
    },
    crear: (req, res) => {
    res.render('products/create');
    },
    save: async(req, res) => {
       /* const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('products/create', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }*/
        /*if (await db.Product.findOne({
            where: { modelo: req.body.modelo }
        })) {
        return res.render('products/create', {
            oldData: req.body,
            errors: {
                name: {
                    msg: 'El modeloe ya se encuentra registrado'
                }
            }
        });
        }*/
        
        db.Autos
            .create({
            marca: req.body.marca,
            modelo: req.body.modelo,
            kilometros: req.body.kilometros,
            anio: req.body.anio,
            color: req.body.color,
            combustible: req.body.combustible,
            motor: req.body.motor,
            precio: req.body.precio,
            imagen: req.file.filename,
            })
            .then(() => {
                return res.redirect('/productos')
            })
    },
    modificar: (req, res) => {
        db.Autos
        .findByPk(req.params.id)
        .then(miAuto => {
            res.render('products/productModify', { miAuto });
        })
    },
    update: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('products/productModify', {
                errors: resultValidation.mapped(),
                auto: {
                    marca: req.body.marca,
                    modelo: req.body.modelo,
                    kilometros: req.body.kilometros,
                    anio: req.body.anio,
                    color: req.body.color,
                    combustible: req.body.combustible,
                    motor: req.body.motor,
                    precio: req.body.precio,
                    imagen: req.file.filename,
                }
            })
        }
        const data = {
            marca: req.body.marca,
            modelo: req.body.modelo,
            kilometros: req.body.kilometros,
            anio: req.body.anio,
            color: req.body.color,
            combustible: req.body.combustible,
            motor: req.body.motor,
            precio: req.body.precio,
            imagen: req.file ? req.file.filename : req.body.oldImage,
        }
        await db.Autos
            .update(data, {
                where: {
                    id: req.params.id
                }
            })
            .then(auto => {
                res.redirect('/productos')
            })
            .catch(error => res.send(error));
    },
    eliminar: (req, res) => {
        db.Autos
        .findByPk(req.params.id)
        .then(miAuto => {
            res.render('products/productDelete', { miAuto });
        })

    },
    destroy: (req, res) => {
        db.Autos
        .destroy({
            where: {
                id: req.params.id
            },
            force: true
        })
        .then(confirm => {
            res.redirect('/productos');
        })
}
}

module.exports = productsController;