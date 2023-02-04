const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();
const authLogin = require('../midware/authorize');

router.use('/', require('./swagger'));

//requiring books
router.use('/books', authLogin.verifyLogin, requiresAuth(), require('../routes/books'));

router.use('/', authLogin.verifyLogin, requiresAuth(), (req, res) => {
    // res.send(JSON.stringify(req.oidc.books));
    res.send('This Page is working');
})

module.exports = router;