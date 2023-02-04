const express = require('express');
const router = express.Router();

const bookController = require('../controllers/cash-register');
const validation = require('../midware/validate');
const authLogin = require('../midware/authorize');

router.get('/', authLogin.verifyLogin, bookController.allCashRegister);
router.put('/:id', authLogin.verifyLogin, validation.checkInfo, bookController.updateBuy);


module.exports = router;