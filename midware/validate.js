const validate = require('../helper/validate');

const checkInfo = (req, res, next) => {
    const rules = {
        title: 'required|string',
        author: 'required|string',
        edition: 'required|string',
        year: 'required|integer',
        country: 'required|string',
        price: 'required|integer',
        portrait: 'required|string',
        score: 'required|integer'
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

const checkCash = (req, res, next) => {
    const rules = {
        revenue: req.body.revenue,
        costLastPurchase: req.body.costLastPurchase
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

module.exports = {checkInfo, checkCash};