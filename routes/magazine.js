const express = require('express');
const router = express.Router();

const bookController = require('../controllers/magazine');
const validation = require('../midware/validate');
const authLogin = require('../midware/authorize');

router.get('/', authLogin.verifyLogin, bookController.allMagazine);
router.get('/:id', authLogin.verifyLogin,bookController.oneMagazine);
router.post('/', authLogin.verifyLogin, validation.checkInfo, bookController.createAMagazine);
router.put('/:id', authLogin.verifyLogin, validation.checkInfo, bookController.updateMagazine);
router.delete('/:id', authLogin.verifyLogin, bookController.deleteMagazine);


module.exports = router;