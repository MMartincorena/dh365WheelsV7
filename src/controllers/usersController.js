const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const db = require("../dataBase/models");
const User = require('../dataBase/models/User');


const userController = {

    profile: (req, res) =>{
          return  res.render('users/userProfile', {
              userLogin: req.session.userLogged,
          });
        
        
    },

    register: (req, res) =>{
        res.render('users/register');
    },
    proccesRegister: async(req, res) => {
       /* const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }*/
        if (await db.User.findOne({
                where: { email: req.body.email }
            })) {
            return res.render('users/register', {
                oldData: req.body,
                errors: {
                    email: {
                        msg: 'El mail ya se encuentra registrado'
                    }
                }
            });
        }

        const userToCreate = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        };
        const userCreated = await db.User
            .create(userToCreate)
        return res.redirect('/usuarios/ingresar')
    },
    
    ingresar: (req, res) =>{
        res.render('users/login')
    },
    login: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        db.User.findOne({
                where: { email: req.body.email }
            })
            .then((userToLogin) => {
                if (userToLogin) {
                    const isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                    if (isOkPassword) {
                        req.session.userLogged = userToLogin;

                        if (req.body.rememberUser) {
                            res.cookie({ where: { email: req.body.email } }, { maxAge: 1000 * 60 * 2 })
                        }
                        return res.redirect('/usuarios/perfil');
                    }
                    return res.render('users/login', {
                        OldData: req.body,
                        errors: {
                            password: {
                                msg: 'Contraseña incorrecta'
                            }
                        }
                    });
                }
                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'verifica tu email'
                        }
                    }
                })
            })

    },
    loguot: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    modificar: (req, res) =>{
        db.User
        .findByPk(req.params.id)
        .then(user => {
            res.render('users/userEdit', { user });
        })
    },
    update: async(req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/userEdit', {
                errors: resultValidation.mapped(),
                user: {
                    id: req.params.id,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    avatar: req.file.filename
                }
            })
        }
        const data = req.body;
        data.nombre = req.body.nombre;
        data.email = req.body.email;
        data.password = bcrypt.hashSync(req.body.password, 10);
        data.avatar = req.file ? req.file.filename : req.body.oldImage;

        await db.User
            .update(data, {
                where: {
                   id: req.params.id
                }
            })
            .then(user => {
                res.redirect('/')
            })
            .catch(error => res.send(error));
    },
    eliminar: (req, res)=>{
        db.User
        .findByPk(req.params.id)
        .then(user => {
            res.render('users/userDelete', { user });
        })
        
    },
    /* ELIMINA USUARIO EN DATA BASE */
    destroy: function (req,res) {
        db.User
        .destroy({
            where: {
                id: req.params.id
            },
            force: true
        })
        .then(confirm => {
            res.redirect('/');
        })
    },

}

module.exports = userController;