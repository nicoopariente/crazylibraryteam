const { json } = require('body-parser');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const allCashRegister = async (req, res, next) => {
    const result = await mongodb.getDb().db('crazylibrary').collection('cashregister').find();
    result.toArray().then((lists) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const findCash = async (id, reveneu, cost) => {
  const reveneuu = reveneu + cost;
  const costLastPurchasee = cost;
  const buy = {
    revenue: reveneuu,
    costLastPurchase: costLastPurchasee
  };
  const response = await mongodb
    .getDb()
    .db('crazylibrary')
    .collection('buy')
    .replaceOne({ _id: id }, buy);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while getting the purchasing.');
  }
}


  const updateBuy = async (req, res) => {
    if(ObjectId.isValid(req.params.id)){
      const userId = new ObjectId(req.params.id);
      const result1 = await mongodb
        .getDb()
        .db('crazylibrary')
        .collection('books')
        .find({ _id: userId });
      const result2 = await mongodb
      .getDb()
      .db('crazylibrary')
      .collection('magazines')
      .find({ _id: userId });
      const result3 = await mongodb
      .getDb()
      .db('crazylibrary')
      .collection('dictionaries')
      .find({ _id: userId });
      const cashInfo = await mongodb.getDb().db('crazylibrary').collection('cashregister').find();
      const reveneu = 0;
      const costLastPurchase = 0
      cashInfo.toArray().then((lists) =>{
        reveneu = json(lists[0].reveneu);
        costLastPurchase = json(lists[0].costLastPurchase);

     });
      const cost = 0;
        
          result1.toArray().then((lists) => {

            if (lists.length > 0){
              cost = json(lists[0].price);
              findCash(userId, reveneu, cost);

            
            }else{ 
                  result2.toArray().then((lists) => {
                   
                    if (lists.length > 0){
                      cost = json(lists[0].price);
                      findCash(userId, reveneu, cost);

                    }else{
                        result3.toArray().then((lists) => {
                          
                          if (lists.length > 0){
                            cost = json(lists[0].price);
                            findCash(userId, reveneu, cost);

                            
                          }else{
                            res.status(500).json('Some error occurred while finding the ID stated.');
                          }
                          
                          
                        })
                    }
                    
                    
                  })
            }
            
            
          })
          
       
     } else {
      res.status(500).json('Some error occurred while finding the ID stated.');
    }
      
    
    };



module.exports = { 
    allCashRegister, 
    updateBuy };