const { validationResult } = require('express-validator')
const db = require('../database/models');
const { auto } = require('./adminController');

const Op = db.Sequelize.Op;

const Autos = db.Auto;


const indexController = {
    index: async(req, res) => {
        db.Autos.findAll()
            .then(autos => {
                res.render('main/index.ejs', { autos })
            })
    },
}

module.exports = indexController;