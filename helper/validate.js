const Validate = require('validatorjs');
const validator = (body, rules, cMessage, callback) => {
    const valid = new Validate(body, rules, cMessage);
    valid.passes(() => callback(null, true));
    valid.fails(() => callback(valid.errors. false));
};

module.exports = validator;