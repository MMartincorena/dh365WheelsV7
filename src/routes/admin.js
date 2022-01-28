const express = require('express');

const adminController = require('../controllers/adminController');

let router = express.Router();

router.get('/admin', adminController.index);
router.get('/admin/usuarios', adminController.user);
router.get('/admin/autos', adminController.auto);
router.get('/admin/principal', adminController.principal);




module.exports = router;