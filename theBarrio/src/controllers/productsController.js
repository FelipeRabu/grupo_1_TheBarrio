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
        db.Users
			.findByPk(req.session.userId)
			.then(userLogin => { 
				db.Products
                    .findAll({
                        include: ['color', 'category', 'size', 'artist','design']
                    })
                    .then (products => {     
                        return res.render('products', {products,userLogin})
                    })
                    .catch(error => console.log(error))
			})
			.catch(error => console.log(error))       
    },

    // Detail - Detail of one product
    detail: (req, res) => {
        let idURL = req.params.productId 

        db.Products
            .findAll({
                include: ['color', 'category', 'size', 'artist','design']
            })
            .then (products => {     
                return res.render('detail', {products, idURL})
            })
            .catch(error => console.log(error))
    },

    create: (req, res) => {
        db.Users
			.findByPk(req.session.userId)
			.then(userLogin => {
                db.Categories
                    .findAll()
                    .then(categories => {
                        db.Colors
                            .findAll()
                            .then(colors => {
                                db.Sizes
                                    .findAll()
                                    .then(sizes => {
                                        db.Designs
                                            .findAll()
                                            .then(designs => {
                                                db.Artists
                                                    .findAll()
                                                    .then(artists => {
                                                        return res.render('product-create-form', { categories, colors, sizes, designs, artists, userLogin});
                                                    })
                                                    .catch(error => console.log(error));
                                            })
                                            .catch(error => console.log(error));                                
                                    })
                                    .catch(error => console.log(error));						
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.log(error)); 
            })
            .catch(error => console.log(error))       
    },

    store: (req, res) => {
                
        db.Products
            .create(req.body)
            .then(()=>res.redirect('/products'))
            .catch(error => console.log(error))
    },
    
    // Update - Form to edit
    edit: (req, res) => {
        
        let idURL = req.params.productId

        db.Categories
			.findAll()
			.then(categories => {
				db.Colors
					.findAll()
					.then(colors => {
                        db.Sizes
                            .findAll()
                            .then(sizes => {
                                db.Designs
                                    .findAll()
                                    .then(designs => {
                                        db.Artists
                                            .findAll()
                                            .then(artists => {
                                                db.Products
                                                .findAll({
                                                    include: ['color', 'category', 'size', 'artist','design']
                                                })
                                                .then (products => {     
                                                    return res.render('product-edit-form', {products, categories, colors, sizes, designs, artists, idURL})
                                                })
                                                .catch(error => console.log(error)) 
                                            })
                                            .catch(error => console.log(error));
                                    })
                                    .catch(error => console.log(error));                                
                            })
                            .catch(error => console.log(error));						
					})
					.catch(error => console.log(error));
			})
			.catch(error => console.log(error));
    },

    // Update - Method to update
    update: (req, res) => {

       db.Products
       .update(
           req.body,
           {
               where: {
                   id_product: req.params.productId
               }
           }
       )
       .then(() => res.redirect('/products'))
       .catch(error => console.log(error));          
    },

    // Delete - Delete one product from DB
    destroy : (req, res) => {

        db.Products
			.destroy({
				where: {
					id_product: req.params.productId
				}
			})
			.then(() => res.redirect('/products'));
    },

};
module.exports = controller;