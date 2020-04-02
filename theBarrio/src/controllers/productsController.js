const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const contentJSON = fs.readFileSync(productsFilePath, 'utf-8');
const arrayProducts = JSON.parse(contentJSON);
const {check, validationResult, body} = require('express-validator');

//Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
const db = require('../database/models')
//const sequelize = db.sequelize

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    // Root - Show all products
    root: (req, res) => {
        db.Products
            .findAll({
                include: ['color', 'category', 'size', 'artist','design']
            })
            .then (products => {   
                return res.render('products', { products })
            })
            .catch(error => console.log(error))
    },

    detail: (req, res) => {
        let idURL = req.params.productId 

        db.Products
            .findByPk(
                req.params.productId,
                {
                include: ['color', 'category', 'size', 'artist','design']
                }
            )
            .then (oneProduct => {     
                return res.render('detail', {oneProduct, idURL})
            })
            .catch(error => console.log(error))
    },
    
    create: (req, res) => {
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
                                                return res.render('product-create-form', { categories, colors, sizes, designs, artists });
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

    store: (req, res) => {
        
        
        console.log("====================ERRORES DE creacion de producto=======================")
        console.log(validationResult(req))
        console.log("===========================================")

        let errors = validationResult(req)
        
        if (errors.isEmpty()) {
        console.log("==================CONTENIDO DEL FORMULARIO=======================");
        console.log(req.body);
        console.log("================================================================");

        // Asignar el nombre final de la imagen
        req.body.image = req.file.filename;

        db.Products
            .create(req.body)
            .then(()=>res.redirect('/products'))
            .catch(error => console.log(error))
     
        }
        else{
            
            let users = db.Users.findAll()
            let categories = db.Categories.findAll()
            let colors = db.Colors.findAll()
            let sizes = db.Sizes.findAll()
            let designs = db.Designs.findAll()
            let artists = db.Artists.findAll()

            Promise.all([users, categories, colors, sizes, designs, artists])
            .then(consultas =>{
               res.render('product-create-form', { 
                errors: errors.errors,

                users: consultas[0],
                categories: consultas[1],
                colors: consultas[2],
                sizes: consultas[3],
                designs: consultas[4],
                artists: consultas[5],
            
            }); 
            })
             
        }
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
                                                .findByPk(
                                                    idURL,
                                                    {
                                                    include: ['color', 'category', 'size', 'artist','design']
                                                    }
                                                )
                                                .then (oneProduct => {     
                                                    return res.render('product-edit-form', {oneProduct, categories, colors, sizes, designs, artists, idURL})
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

        let errors = validationResult(req)

        console.log("====================ERRORES DE edicion de producto=======================")
        console.log(validationResult(req))
        console.log("===========================================")

        
        if (errors.isEmpty()) {

            //si no hay errores:
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
       
        } else {

            let idURL = req.params.productId

            let users = db.Users.findAll()
            let categories = db.Categories.findAll()
            let colors = db.Colors.findAll()
            let sizes = db.Sizes.findAll()
            let designs = db.Designs.findAll()
            let artists = db.Artists.findAll()
            let oneProduct = db.Products.findByPk(idURL,{include: ['color', 'category', 'size', 'artist','design']})

            Promise.all([users, categories, colors, sizes, designs, artists, oneProduct])
            .then(consultas => {
               res.render('product-edit-form', {idURL,
                errors: errors.errors,

                users: consultas[0],
                categories: consultas[1],
                colors: consultas[2],
                sizes: consultas[3],
                designs: consultas[4],
                artists: consultas[5],
                oneProduct: consultas[6],
            }); 
            })
        } //cierre del else
    },


    //Si hay errores (else):







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