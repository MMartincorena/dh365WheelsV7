const { body } = require('express-validator');

const validationsregister = [
    body('nombre').notEmpty().withMessage('Ingresá tu nombre'),
    body('apellido').notEmpty().withMessage('Ingresá tu apellido'),
    body('email')
    .notEmpty().withMessage('Ingresá tu correo electrónico').bail()
    .isEmail().withMessage('debe tener un formato válido'),
    body('password').notEmpty().withMessage('Ingresá tu contraseña')
    .isLength({ min: 8 }).withMessage('Debe contener al menos 8 caracteres'),
    body('chbx').notEmpty().withMessage('Debe aceptar los términos y condiciones'),
    body('avatar').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if(!file){
            throw new Error('Debes subir una imágen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo aceptadas son ${acceptedExtensions.join(', ')}`);
             }
        }
        return true;
    }),
    
];
module.exports = validationsregister;