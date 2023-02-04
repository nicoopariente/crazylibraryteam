const express = require('express');
const router = express.Router();

const bookController = require('../controllers/books');
const validation = require('../midware/validate');
const authLogin = require('../midware/authorize');

router.get('/', authLogin.verifyLogin, bookController.allBooks);
router.get('/:id', authLogin.verifyLogin,bookController.oneBook);
router.post('/', authLogin.verifyLogin, validation.checkInfo, bookController.createABook);
router.put('/:id', authLogin.verifyLogin, validation.checkInfo, bookController.updateBook);
router.delete('/:id', authLogin.verifyLogin, bookController.deleteBook);


module.exports = router;