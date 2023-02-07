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

const findCash = async ( reveneu, cost) => {
  const reveneuu = reveneu + cost;
  const costLastPurchasee = cost;
  console.log(reveneuu);
  console.log(costLastPurchasee);
  const buy = {
    revenue: reveneuu,
    costLastPurchase: costLastPurchasee
  };
  const response = await mongodb
    .getDb()
    .db('crazylibrary')
    .collection('cashregister')
    .replaceOne({}, buy);
  console.log(response);  
  
  if (response.modifiedCount > 0) {
    //res.status(204).send();
    console.log("yes")
  } else {
    //res.status(500).json(response.error || 'Some error occurred while getting the purchasing.');
    console.log("no")
  }
}


  const updateBuy = async (req, res) => {
    console.log(req.params.id);
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
      let reveneu = 0;
      let costLastPurchase = 0
      cashInfo.toArray().then((lists) =>{
        reveneu = lists[0].revenue;
        costLastPurchase = lists[0].costLastPurchase;

     });
      let cost = 0;
      let help = 0;
      const idCash = "63df13f75eaa1eacf814f54c";
           result1.toArray().then(async (lists) => {

            if (lists.length > 0){
              cost = lists[0].price;
              console.log(cost);
              /*const result = await mongodb.getDb().db('crazylibrary').collection('cashregister').find();
    result.toArray().then((lists) =>{
        console.log(lists[0])
    });*/     findCash(reveneu, cost)
              res.status(200).json(`Your purchase was done successfully. You will be charged $${cost}. Thanks you. `);
              /*const reveneuu = reveneu + cost;
              const costLastPurchasee = cost;
              console.log(reveneuu);
              console.log(costLastPurchasee);
              const buy = {
                revenue: reveneuu,
                costLastPurchase: costLastPurchasee
              };
              const response = await mongodb
                .getDb()
                .db('crazylibrary')
                .collection('cashregister')
                .replaceOne({}, buy);
              console.log(response);  */
            
            }else{ 
                  result2.toArray().then(async (lists) => {
                   
                    if (lists.length > 0){
                      cost = lists[0].price;;
                      findCash(reveneu, cost);
                      res.status(200).json(`Your purchase was done successfully. You will be charged $${cost}. Thanks you.  `);

                    }else{
                        result3.toArray().then(async (lists) => {
                          
                          if (lists.length > 0){
                            cost = lists[0].price;;
                            findCash(reveneu, cost);
                            res.status(200).json(`Your purchase was done successfully. You will be charged $${cost}. Thanks you.  `);

                            
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