const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const allMagazine = async (req, res, next) => {
  try{const result = await mongodb.getDb().db('crazylibrary').collection('magazines').find();
    result.toArray().then((lists) =>{
        res.status(200).json(lists);
    });}catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
          } else {
            console.log('Unexpected error', error);
          }
       
    }
};

const oneMagazine = async (req, res, next) => {

  if (ObjectId.isValid(req.params.id)){
    const magazineId = new ObjectId(req.params.id);
    const result = await mongodb.getDb()
    .db('crazylibrary')
    .collection('magazines')
    .find({_id: magazineId});
    result.toArray().then((lists) => {
      if(lists.length > 0){ 
        res.status(200).json(lists[0]);}else{
          res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);}
       
    });
  }else{ res.status(404).send(`Wrong ID: ${req.params.id}`);}
   
};

const createAMagazine = async (req, res) => {
    const magazine = {
        title: req.body.title,
        author: req.body.author,
        edition: req.body.edition,
        year: req.body.year,
        country: req.body.country,
        price: req.body.price,
        portrait: req.body.portrait,
        score: req.body.score
    };
    console.log(magazine);
    const response = await mongodb.getDb().db('crazylibrary')
    .collection('magazines').insertOne(magazine);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Verify the information you are adding for adding a magazine, maybe is wrong');
    }
};

const updateMagazine = async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const magazineId = new ObjectId(req.params.id);
      // be aware of updateOne if you only want to update specific fields
      const magazine = {
        title: req.body.title,
        author: req.body.author,
        edition: req.body.edition,
        year: req.body.year,
        country: req.body.country,
        price: req.body.price,
        portrait: req.body.portrait,
        score: req.body.score
      };
      const response = await mongodb
        .getDb()
        .db('crazylibrary')
        .collection('magazine')
        .replaceOne({ _id: magazineId }, magazine);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the magazine.');
      }
        
      }
      
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const deleteMagazine = async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const magazineId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db('crazylibrary').collection('magazine').remove({ _id: magazineId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the magazine.');
      }
      }
      
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports = { 
    allMagazine,  
    oneMagazine, 
    createAMagazine, 
    updateMagazine, 
    deleteMagazine };