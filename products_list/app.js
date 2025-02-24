// Importing necessary libraries
const express = require('express');
const fs = require('fs');
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

// Load the product list from the JSON file
const data = JSON.parse(fs.readFileSync('products.json'));
let products = data.products;

// Define the route for getting all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Define the route for getting a single product by name
app.get('/products/:product_name', (req, res) => {
    const productName = req.params.product_name;
    const product = products.find(p => p.product === productName);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Define the route for adding a new product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Define the route for updating a product by name
app.put('/products/:product_name', (req, res) => {
    const productName = req.params.product_name;
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.product === productName);
    if (index !== -1) {
        products[index] = updatedProduct;
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Define the route for deleting a product by name
app.delete('/products/:product_name', (req, res) => {
    const productName = req.params.product_name;
    products = products.filter(p => p.product !== productName);
    res.status(204).end();
});

// Run the Express application
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});