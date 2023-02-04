const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const allCashRegister = async (req, res, next) => {
    const result = await mongodb.getDb().db('crazylibrary').collection('cashregister').find();
    result.toArray().then((lists) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const updateBuy = async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Invalid purchasing id.');
      }
      const buyId = new ObjectId(req.params.id);
      // be aware of updateOne if you only want to update specific fields
      const buy = {
        revenue: req.body.revenue,
        costLastPurchase: req.body.costLastPurchase
      };
      const response = await mongodb
        .getDb()
        .db('crazylibrary')
        .collection('buy')
        .replaceOne({ _id: buyId }, buy);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while getting the purchasing.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports = { 
    allCashRegister, 
    updateBuy };