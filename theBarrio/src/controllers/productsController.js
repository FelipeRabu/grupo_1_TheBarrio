const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const contentJSON = fs.readFileSync(productsFilePath, 'utf-8');
const arrayProducts = JSON.parse(contentJSON);

//Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
const db = require('../database/models')
const sequelize = db.sequelize

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    // Root - Show all products
    root: (req, res) => {        
        res.render('products', {arrayProducts})
    },


    // Detail - Detail of one product
    detail: (req, res) => {
        let idURL = req.params.productId 
        res.render('detail', {arrayProducts, idURL})
    },

    // Create - Form to create products
    create: (req, res) => {
        res.render('product-create-form')
    },
    
    // Create -  Method to store products
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
        let idURL = req.params.productId 
        res.render('product-edit-form', {arrayProducts, idURL}) //tengo que crear esta vista. Puede ser igual al de creacion pero hay que poner el id y los campos ya estan autocompletados ocn lo que tiene ahora
    },

    // Update - Method to update
    update: (req, res) => {
                
        /*ESTE CODIGO NO FUNCIONA PERO NO SE PORQUE*/
        /*let updatedProducts = arrayProducts.map (function(oneProduct) {            
            if (oneProduct.id == Number(req.params.productId)) {
                console.log("Algo dio TRUE ===============")
                oneProduct = req.body; //esta mal esto pero es algo asi
            }             
        })*/

        for (let i =0; i < arrayProducts.length; i++) {
            if (arrayProducts[i].id == Number(req.params.productId)) {
                const newProduct = {
                    id: arrayProducts[i].id,
                    ...req.body
                }
                
                arrayProducts[i]=newProduct                
        }
    }

        //console.log(updatedProducts, "updateterere")
        fs.writeFileSync(productsFilePath, JSON.stringify(arrayProducts, null, ' '));

        res.send('Editaste el producto con id: ' + req.params.productId);
    },

    // Delete - Delete one product from DB
    destroy : (req, res) => {

        console.log("El id de la URL es " + req.params.productId + " y es del tipo " + typeof Number(req.params.productId))

        let newProducts = arrayProducts.filter (function(oneProduct) {
            console.log("El id del array es " + oneProduct.id + " y es del tipo " + typeof oneProduct.id);
            console.log(oneProduct.id == Number(req.params.productId));
            return oneProduct.id != Number(req.params.productId);              
        })

        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
        res.send('Borraste el producto con id: ' + req.params.productId);
    },

    index: (req, res) => {
        //res.render('products', {arrayProducts}) //borrar esto de arrayProducts

        sequelize
            .query('SELECT * FROM categories')
            .then (results => {
                return res.render('products2', {results});
            })
            .catch(error => console.log(error))
    }
};
module.exports = controller;