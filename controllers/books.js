const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const allBooks = async (req, res, next) => {
  try{const result = await mongodb.getDb().db('crazylibrary').collection('books').find();
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

const oneBook = async (req, res, next) => {


    if (ObjectId.isValid(req.params.id)){
      const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb()
    .db('crazylibrary')
    .collection('books')
    .find({_id: bookId});
    
      result.toArray().then((lists) => {
        if(lists.length > 0){
      res.status(200).json(lists[0]);}else{
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);}
  });
   }else{ res.status(404).send(`Wrong ID: ${req.params.id}`);}
     
  

  
   
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
      if (ObjectId.isValid(req.params.id)) {
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
      }
      
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const deleteBook = async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        
        const bookId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db('crazylibrary').collection('books').remove({ _id: bookId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book.');
      }
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