const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/products');
    },
    filename: (req, file, cb) => {
      let fileName = `auto-img${Date.now()}${path.extname(file.originalname)}`
      cb(null, fileName);
  }
});

const uploadFile = multer({ storage });

const productsController = require('../controllers/productsController');
const validationsProduct = require('../Middlewares/productValidation');


router.get('/', productsController.list);
router.post('/', uploadFile.single('imagen'), validationsProduct, productsController.save);
router.get('/carrito', productsController.cart);
router.get('/crear', productsController.crear);
router.get('/:id/modificar', productsController.modificar);
router.put('/:id/actualizar', uploadFile.single('imagen'), productsController.update);
router.get('/:id/eliminar', productsController.eliminar);
router.delete('/:id/destruir', productsController.destroy);
router.get('/:id', productsController.show);


module.exports = router;