const express = require('express')
const { ObjectId }= require('mongodb')
const { MongoClient } = require('mongodb')
const cors = require('cors'); // Import cors
const { result } = require('lodash');


const app = express();
app.use(express.json()); 
const PORT = 3000;

app.use(cors()); // Enable CORS for cross-origin requests



// Replace with your MongoDB connection string
const uri = "mongodb+srv://willexofficial:willexSTUD123@project.vc0sa.mongodb.net/?retryWrites=true&w=majority&appName=project"; // Adjust as necessary
const client = new MongoClient(uri);

let db

async function connectDB() {
    try {
        await client.connect();
        db=client.db('data')
        console.log('Connected to MongoDB');

         // Ensure the text index is created on all string fields in the 'products' collection
         await db.collection('products').createIndex({ "$**": "text" });
         console.log('Text index created or already exists');
    } 
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB(); // Connect to the database when the server starts
    db = client.db('data'); // Connect to the database
});







//new get request function
app.get('/products', (req, res) => {
  
    let products = []
  
    db.collection('products')
      .find()
      .forEach(product => products.push(product))
      .then(() => {
        res.status(200).json(products)
      })
      .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
        console.error('Error fetching documents')
      })
  });

  



  app.get('/products/:id', (req, res) => {
    const idParam = req.params.id;
  
    // Check if the id is a valid MongoDB ObjectId
    if (ObjectId.isValid(idParam)) {
      db.collection('products')
        .findOne({ _id: new ObjectId(idParam) })
        .then(doc => {
          if (doc) {
            res.status(200).json(doc);
            console.log('Requested via MongoDB _id:', idParam);
          } else {
            res.status(404).json({ error: 'Product not found' });
          }
        })
        .catch(err => {
          res.status(500).json({ error: 'Could not fetch the document via MongoDB _id' });
          console.error('Error fetching via MongoDB _id:', err);
        });
    } 
    else {
      // Try to fetch using custom 'id'
      const customId = parseInt(idParam, 10); // Convert to integer
      db.collection('products')
        .findOne({ id: customId })
        .then(doc => {
          if (doc) {
            res.status(200).json(doc);
            console.log('Requested using custom id:', customId);
          } else {
            res.status(404).json({ error: 'Product not found' });
          }
        })
        .catch(err => {
          res.status(500).json({ error: 'Could not fetch the document via custom id' });
          console.error('Error fetching via custom id:', err);
        });
    }
  });
  

  app.post('/products', (req, res) => {
    const product = req.body

    db.collection('products')
     .insertOne(product)
     .then(result =>{
        res.status(201).json(result)
     })
     .catch(err => {
        res.status(500).json({err: 'Could not add the document'})
     })
  });




  app.delete('/products/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
  
        db.collection('products')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result => {
          res.status(200).json(result)
          console.log('Requested ID:', req.params.id);

        })
        .catch(err => {
          res.status(500).json({error: 'Could not delete the document'})
        })
        
    } else {
      res.status(500).json({error: 'Could not find the document id'})
    }
  
  });

  app.patch('/products/:id', (req, res) => {
    const update = req.body
    if (ObjectId.isValid(req.params.id)) {
  
        db.collection('products')
        .updateOne({_id: new ObjectId(req.params.id)},{$set: update})
        .then(result => {
          res.status(200).json(result)
         
        })
        .catch(err => {
          res.status(500).json({error: 'Could not UPDATE the document'})
        })
        
    } else {
      res.status(500).json({error: 'Could not find the document id'})
    }
  });




  app.post('/order', (req, res) => {
    const newOrder = req.body

    db.collection('order')
     .insertOne(newOrder)
     .then(result =>{
        res.status(201).json(result)
     })
     .catch(err => {
        res.status(500).json({err: 'Could not add the document'})
     })
  });
  
  app.get('/order', (req, res) => {
    let orders =[]

    db.collection('order')
      .find()
      .forEach(order => orders.push(order))
      .then(() => {
        res.status(200).json(orders)
      })
      .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
        console.error('Error fetching documents')
      })
    
  });

  app.get('/order/:id', (req, res) => {


    if (ObjectId.isValid(req.params.id)) {
  
      db.collection('order')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
          res.status(200).json(doc)
          console.log('Requested ID:', req.params.id);

        })
        .catch(err => {
          res.status(500).json({error: 'Could not fetch the document'})
        })
        
    } else {
      res.status(500).json({error: 'Could not fetch the document'})
    }
  
  });

  app.put('/products/purchase', (req, res) => {
  const products = req.body.items; // Array of products with quantity to be updated
  const updatePromises = []; // Store promises for updating inventory

  // Iterate through each product in the cart
  products.forEach(item => {
    const productId = item.productId; // Product ID from cart item
    const quantityBought = item.quantity; // Quantity to subtract from inventory

    // Validate quantity
    if (isNaN(quantityBought) || quantityBought <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    // Push each inventory update operation into the promises array
    const updatePromise = db.collection('products')
      .updateOne(
        { _id: new ObjectId(productId) }, // Find product by ID
        { $inc: { inventory: -quantityBought } } // Decrease inventory by quantity
      )
      .then(result => {
        if (result.matchedCount === 0) {
          throw new Error(`Product with ID ${productId} not found`);
        }
        console.log(`Product ${productId} inventory updated`);
      })
      .catch(err => {
        throw new Error(`Error updating product ${productId}: ${err.message}`);
      });

    updatePromises.push(updatePromise); // Add the promise to the array
  });

  // Wait for all inventory updates to finish
  Promise.all(updatePromises)
    .then(() => {
      res.status(200).json({ message: 'All inventories updated successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: `Could not update inventory for some products: ${err.message}` });
    });
});

    app.get('/products/search', async (req, res) => {
    const searchQuery = req.query.q; // The search parameter, e.g., "ed"

    if (!searchQuery) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        // Search across all fields with a case-insensitive partial match
        const products = await db.collection('products').find({
            $text: { $search: searchQuery }
        }).toArray();

        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Error retrieving data' });
    }
});

