const { body } = require('express-validator');

const validationsProduct = [
    body('marca').notEmpty().withMessage('Ingresá la marca'),
    body('modelo').notEmpty().withMessage('Ingresá el modelo'),
    body('kilometros')
    .notEmpty().withMessage('Ingresá los KM'),
    body('anio').notEmpty().withMessage('Ingresá el año'),
    body('color').notEmpty().withMessage('Ingresá el color'),
    body('combustible').notEmpty().withMessage('Ingresá el tipo de combustible'),
    body('motor').notEmpty().withMessage('Ingresá la cilindrada del motor'),
    body('precio').notEmpty().withMessage('Ingresá el precio'),
    body('imagen').custom((value, {req}) =>{
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
module.exports = validationsProduct;
