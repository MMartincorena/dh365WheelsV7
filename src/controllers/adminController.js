const path = require('path');
const fs = require('fs');

const usuarios = require('../dataBase/models/User');
const autos = require('../dataBase/models/Auto');



const adminController = {
    index: (req, res) =>{
        res.render('admin/main')
    },
    user:(req, res) =>{
        res.render('admin/userCrud', {usuarios})
    },
   auto:(req, res) =>{
    res.render('admin/autoCrud', {autos})
    },
    principal: (req, res) => {
        res.send('Martin Martincorena come travas');
    }
}

module.exports = adminController;