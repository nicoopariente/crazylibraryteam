const validate = require('../helper/validate');

const checkBook = (req, res, next) => {
    const rules = {
        title: 'required|string',
        author: 'required|string',
        edition: 'required|string',
        year: 'required|integer',
        country: 'required|string',
        price: 'required|string'
    };
    validate(req.body, rules, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: 'Attempt failed',
                data: err
            })
        } else {
            next();
        }
    })
}

module.exports = {checkBook};