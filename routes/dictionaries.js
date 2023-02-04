const express = require('express');
const router = express.Router();

const bookController = require('../controllers/dictionaries');
const validation = require('../midware/validate');
const authLogin = require('../midware/authorize');

router.get('/', authLogin.verifyLogin, bookController.allDictionaries);
router.get('/:id', authLogin.verifyLogin,bookController.oneDictionaries);
router.post('/', authLogin.verifyLogin, validation.checkInfo, bookController.createADictionaries);
router.put('/:id', authLogin.verifyLogin, validation.checkInfo, bookController.updateDictionaries);
router.delete('/:id', authLogin.verifyLogin, bookController.deleteDictionaries);


module.exports = router;