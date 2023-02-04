const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const allBooks = async (req, res, next) => {
    const result = await mongodb.getDb().db('crazylibrary').collection('books').find();
    result.toArray().then((lists) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const oneBook = async (req, res, next) => {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb()
    .db('crazylibrary')
    .collection('books')
    .find({_id: bookId});
    result.toArray().then((lists) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createABook = async (req, res) => {
    const book = {
      title: req.body.title,
      author: req.body.author,
      edition: req.body.edition,
      year: req.body.year,
      country: req.body.country,
      price: req.body.price,
      portrait: req.body.portrait,
      score: req.body.score
    };
    console.log(book);
    const response = await mongodb.getDb().db('crazylibrary')
    .collection('books').insertOne(book);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Verify the information you are adding for adding a book, maybe is wrong');
    }
};

const updateBook = async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Invalid book id.');
      }
      const bookId = new ObjectId(req.params.id);
      // be aware of updateOne if you only want to update specific fields
      const book = {
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
        .collection('books')
        .replaceOne({ _id: bookId }, book);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const deleteBook = async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Invalid book id.');
      }
      const bookId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db('crazylibrary').collection('books').remove({ _id: bookId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports = { 
    allBooks,  
    oneBook, 
    createABook, 
    updateBook, 
    deleteBook };