const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const path = require('path');
const fs = require('fs');

const User = require('../models/User');

const users = path.join(__dirname, '../dataBase/users.json');
const usuarios = JSON.parse(fs.readFileSync(users, 'utf-8'));




const userController = {

    /*list: (req, res) => {

        res.render('users/userList', {usuarios});
    },*/

    profile: (req, res) =>{
          return  res.render('users/userProfile', {
              userLogin: req.session.userLogged,
          });
        
        
    },

    register: (req, res) =>{
        res.render('users/register');
    },
    proccesRegister: (req, res) =>{
       /* const resultaValidation =  validationResult(req);
        if (resultaValidation.errors.length > 0){
            res.render('users/register', {
                errors: resultaValidation.mapped(),
                oldData: req.body,
            });
        };*/
        let userInDB = User.findByField('email', req.body.email);
        if(userInDB){
            res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body,
            });
        }
        const userCreate = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10),
            avatar: req.file.filename
        }
        let userCreated = User.create(userCreate);
        if(userCreated) {
            res.redirect('/usuarios/ingresar')
        }
    },
    
    ingresar: (req, res) =>{
        res.render('users/login')
    },
    login: (req, res) =>{
        const resultaValidation =  validationResult(req);
         if (resultaValidation.errors.length > 0){
             res.render('users/login', {
                 errors: resultaValidation.mapped(),
                 oldData: req.body,
             });
         };
             let userLogin = User.findByField('email', req.body.email);
 
             if(userLogin){
                 let passwordOk = bcrypt.compareSync(req.body.password, userLogin.password);
                 if(passwordOk){
                     delete userLogin.password;
                     delete userLogin.confirmPassword;
                     req.session.userLogged = userLogin;
                     if(req.body.recordar){
                         res.cookie('userEmail', req.body.email, { maxAge: 1000 * 120})
                     };
                     return res.redirect('/usuarios/perfil');
                 }
                 return res.render('users/login', {
                     errors: {
                         email: {
                             msg: 'Crendenciales inválidas'
                         }
                     },
                     oldData: req.body,
                 });
             }
             return res.render('users/login', {
                 errors: {
                     email: {
                         msg: 'Este email no se encuentra registrado'
                     }
                 },
                 oldData: req.body,
             });
     },
    loguot: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    modificar: (req, res) =>{
        const idUser = req.params.id;
        let miUser = usuarios.find(user=> user.id == idUser);
        if(miUser){
            res.render('users/userEdit', {miUser});  
        }else{
            res.render('main/not-found');
        };
    },
    update: (req, res) => {
        const userEdit = req.body;
        req.body.id = req.params.id;
        req.body.avatar = req.file ? req.file.filename : req.body.oldImagen;
        let userEditar = usuarios.map(user =>{
            if(user.id == req.body.id){
                return user = userEdit;   
            } console.log(userEdit)
            return user;
           
            
        }); 
        let userActualizar = JSON.stringify(userEditar, null, 2);
        fs.writeFileSync(path.resolve(__dirname,'../dataBase/users.json'),userActualizar);
        res.redirect('/usuarios');
    },
    eliminar: (req, res)=>{
        const idUser = req.params.id;
        let miUser = usuarios.find(user=> user.id == idUser);
        if(miUser){
            res.render('users/userDelete', {miUser});  
        }else{
            res.render('main/not-found');
        };
        
    },
    destroy: (req,res) =>{
        const userDeleteId = req.params.id;
        const usuariosFinal = usuarios.filter(user => user.id != userDeleteId);
        let userGuardar = JSON.stringify(usuariosFinal,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../dataBase/users.json'),userGuardar);
       res.redirect('/usuarios');
    }
}

module.exports = userController;