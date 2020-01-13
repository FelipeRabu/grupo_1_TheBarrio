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
        let contenidoJSON = fs.readFileSync(productsFilePath, 'utf-8') 
        let arrayProducts = JSON.parse(contenidoJSON)
        let idURL = req.params.productId 
        res.render('detail', {arrayProducts, idURL})
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('product-create-form') /* BORRAR ESTO */
    },
    
    // Create -  Method to store
    store: (req, res) => {

        let contentProductsJSON = fs.readFileSync(productsFilePath, 'utf-8')
        let arrayProducts2 = []
        
        if (contentProductsJSON) {
            arrayProducts2 = JSON.parse(contentProductsJSON)           
        }
        
        req.body = {
            id: arrayProducts2[arrayProducts2.length-1].id + 1,
            ...req.body
        }
        
        arrayProducts2.push(req.body)
        
        
        fs.writeFileSync(productsFilePath, JSON.stringify(arrayProducts2, null, ' ')); 

        // Mensaje de éxito
		res.send('¡Producto creado con éxitooooo!');
        
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
        
        let newProducts = products.filter (function(oneProduct) {
            req.body.id =! req.params.productId
        })

        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts)) 
    }
};
module.exports = controller;