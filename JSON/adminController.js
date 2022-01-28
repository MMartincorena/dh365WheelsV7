const path = require('path');
const fs = require('fs');

const User = require('../models/User');

const users = path.join(__dirname, '../dataBase/users.json');
const usuarios = JSON.parse(fs.readFileSync(users, 'utf-8'));

const products = path.join(__dirname, '../dataBase/products.json');
const autos = JSON.parse(fs.readFileSync(products, 'utf-8'));

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