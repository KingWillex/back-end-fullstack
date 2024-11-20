// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const mustache = require('mustache');
const _ = require('lodash');
// Create an instance of Express
const app = express();

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://willexofficial:willexSTUD123@project.vc0sa.mongodb.net/?retryWrites=true&w=majority&appName=project';

// Create a MongoDB client
const client = new MongoClient(mongoURI);

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('MongoDB connected...');
    const db = client.db('data'); // database name 
    const collection = db.collection('products '); // collection name
        
    // Define a simple route
        app.get('/website', (req, res) => {
            res.send('Hello World');
          });
      

//get and post methods===============================================================

    // Define a POST route to insert data into MongoDB
    app.post('/data', (req, res) => {
        const data = req.body; // Get data from the request body
        collection.insertOne(data) // Insert data into the collection
          .then(result => {
            res.status(201).send({ message: 'Data inserted', id: result.insertedId });
          })
          .catch(error => {
            console.error('Error inserting data:', error);
            res.status(500).send('Error inserting data');
          });
      });




    // Listen on port 4000
    const port = 4000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });