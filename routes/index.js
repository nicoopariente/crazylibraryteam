const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();
const authLogin = require('../midware/authorize');

router.use('/', require('./swagger'));

//requiring books
router.use('/books', authLogin.verifyLogin, requiresAuth(), require('../routes/books'));
//requiring magazines
router.use('/magazines', authLogin.verifyLogin, requiresAuth(), require('../routes/magazine'));
//requiring dictionaries
router.use('/dictionary', authLogin.verifyLogin, requiresAuth(), require('../routes/dictionaries'));
//requiring Cash Register
router.use('/cash-register', authLogin.verifyLogin, requiresAuth(), require('../routes/cash-register'));

router.use('/', authLogin.verifyLogin, requiresAuth(), (req, res) => {
    // res.send(JSON.stringify(req.oidc.books));
    res.send('This Page is working');
})

module.exports = router;