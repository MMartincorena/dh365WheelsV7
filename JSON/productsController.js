const path = require('path');
const fs = require('fs');


const Product = require('../models/Product');

const products = path.join(__dirname, '../dataBase/products.json');
const autos = JSON.parse(fs.readFileSync(products, 'utf-8'));


const productsController = {

    list: (req, res) => {

        res.render('products/desProducto', { autos });
    },
    show: (req, res) => {
        let miAuto;
        autos.forEach(auto => {
            if (auto.id == req.params.id) {
                miAuto = auto;
            }
        });
        res.render('products/productDetail', { miAuto: miAuto });

    },
    /*detail: (req, res) => {
        res.render('products/productDetail')
    },*/
    cart: (req, res) => {
        res.render('products/productCart')
    },
    crear: (req, res) => {
        res.render('products/create');
    },
    save: (req, res) => {
        const autoCreate = {
            marca: req.body.marca,
            modelo: req.body.modelo,
            kilometros: req.body.kilometros,
            año: req.body.año,
            color: req.body.color,
            combustible: req.body.combustible,
            motor: req.body.motor,
            precio: req.body.precio,
            imagen: req.file.filename,
        };
        let autoCreated = Product.create(autoCreate);
        return res.render('products/desProducto');
        /* const productCreate = req.body;
         const imageUpLoad = req.file;
         let ultimoAuto = autos.pop();
         autos.push(ultimoAuto);
         let autoNuevo = {
             id: ultimoAuto.id +1,
             marca: productCreate.marca,
             logo: productCreate.logo,
             modelo: productCreate.modelo,
             kilometros: productCreate.kilometros,
             año: productCreate.año,
             color: productCreate.color,
             combustible: productCreate.combustible,
             motor: productCreate.motor,
             precio: productCreate.precio,
             imagen: imageUpLoad.fileName,
         };
         autos.push(autoNuevo);
         let autoNuevoGuardar = JSON.stringify(autos,null,2);
         fs.writeFileSync(path.resolve(__dirname,'../dataBase/products.json'), autoNuevoGuardar);
         res.redirect('/productos');*/
    },
    modificar: (req, res) => {
        const idAuto = req.params.id;
        let miAuto = autos.find(auto => auto.id == idAuto);
        if (miAuto) {
            res.render('products/productModify', { miAuto });
        } else {
            res.render('main/not-found');
        };
    },
    update: (req, res) => {
        const productEdit = req.body;
        req.body.id = req.params.id;
        console.log(productEdit);
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        let autosEditar = autos.map(auto => {
            if (auto.id == req.body.id) {
                return auto = productEdit;
            }
            console.log(productEdit)
            return auto;


        });


        let autoActualizar = JSON.stringify(autosEditar, null, 2);
        console.log(autoActualizar);
        fs.writeFileSync(path.resolve(__dirname, '../dataBase/products.json'), autoActualizar);
        res.redirect('/productos');
    },
    eliminar: (req, res) => {
        const idAuto = req.params.id;
        let miAuto = autos.find(auto => auto.id == idAuto);
        if (miAuto) {
            res.render('products/productDelete', { miAuto });
        } else {
            res.render('main/not-found');
        };

    },
    destroy: (req, res) => {
        const autoDeleteId = req.params.id;
        const autosFinal = autos.filter(auto => auto.id != autoDeleteId);
        let autoGuardar = JSON.stringify(autosFinal, null, 2)
        fs.writeFileSync(path.resolve(__dirname, '../dataBase/products.json'), autoGuardar);
        res.redirect('/productos');
    }
}

module.exports = productsController;