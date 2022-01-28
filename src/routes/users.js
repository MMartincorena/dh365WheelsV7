const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const guestMiddleware = require('../Middlewares/guestMiddleware');
const authMiddleware = require('../Middlewares/authMiddleware');



const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/users');
    },
    filename: (req, file, cb) => {
        let fileName = `user-img${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName);
    }
});

const uploadFile = multer({ storage });

const usersController = require('../controllers/usersController');
const validationsregister = require('../Middlewares/registerValidation');
const validationsLogin = require('../Middlewares/loginValidations');




router.get('/registrar', guestMiddleware, usersController.register);
router.post('/registrar',uploadFile.single('avatar'), validationsregister, usersController.proccesRegister);
router.get('/ingresar', guestMiddleware, usersController.ingresar);
router.post('/ingresar', validationsLogin, usersController.login);
router.get('/:id/modificar', usersController.modificar);
router.put('/:id/actualizar', uploadFile.single('avatar'), usersController.update);
router.get('/:id/eliminar', usersController.eliminar);
router.delete('/:id/destruir', usersController.destroy);
router.get('/logout', usersController.loguot);
router.get('/perfil', authMiddleware, usersController.profile);



module.exports = router;