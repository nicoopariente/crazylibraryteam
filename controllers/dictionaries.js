const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const allDictionaries = async (req, res, next) => {
    const result = await mongodb.getDb().db('crazylibrary').collection('dictionaries').find();
    result.toArray().then((lists) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const oneDictionaries = async (req, res, next) => {
    const dictionarieId = new ObjectId(req.params.id);
    const result = await mongodb.getDb()
    .db('crazylibrary')
    .collection('dictionaries')
    .find({_id: dictionarieId});
    result.toArray().then((lists) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createADictionaries = async (req, res) => {
    const dictionarie = {
        title: req.body.title,
        author: req.body.author,
        edition: req.body.edition,
        year: req.body.year,
        country: req.body.country,
        price: req.body.price,
        portrait: req.body.portrait,
        score: req.body.score
    };
    console.log(dictionarie);
    const response = await mongodb.getDb().db('crazylibrary')
    .collection('dictionaries').insertOne(dictionarie);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Verify the information you are adding for adding a dictionary, maybe is wrong');
    }
};

const updateDictionaries = async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Invalid dictionarie id.');
      }
      const dictionarieId = new ObjectId(req.params.id);
      // be aware of updateOne if you only want to update specific fields
      const dictionarie = {
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
        .collection('dictionaries')
        .replaceOne({ _id: dictionarieId }, dictionarie);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the dictionary.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const deleteDictionaries = async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Invalid book id.');
      }
      const dictionarieId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db('crazylibrary').collection('dictionaries').remove({ _id: dictionarieId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the dictionary.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports = { 
    allDictionaries,  
    oneDictionaries, 
    createADictionaries, 
    updateDictionaries, 
    deleteDictionaries };