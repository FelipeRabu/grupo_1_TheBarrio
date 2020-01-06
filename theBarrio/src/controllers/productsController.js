const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    // Root - Show all products
    root: (req, res) => {
        let contenidoJSON = fs.readFileSync(productsFilePath, 'utf-8') 
        let arrayProducts = JSON.parse(contenidoJSON)
        res.render('products', {arrayProducts})
    },


    // Detail - Detail from one product
    detail: (req, res) => {
        res.render('detail') /* BORRAR ESTO */


    },
    // Create - Form to create
    create: (req, res) => {
        res.render('product-create-form') /* BORRAR ESTO */
    },
    
    // Create -  Method to store
    store: (req, res) => {
        // Do the magic
    },
    // Update - Form to edit
    edit: (req, res) => {
        // Do the magic
    },
    // Update - Method to update
    update: (req, res) => {
        // Do the magic
    },
    // Delete - Delete one product from DB
    destroy : (req, res) => {
        // Do the magic
    }
};
module.exports = controller;