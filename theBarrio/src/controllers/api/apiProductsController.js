const db = require('../../database/models')
const sequelize = db.sequelize


const controller = {
    
    list: (req, res) => {
        db.Users
			.findByPk(req.session.userId)
			.then(userLogin => { 
				db.Products
                    .findAll({
                        include: ['color', 'category', 'size', 'artist','design']
                    })
                    .then (products => {
                        db.Categories
                            .findAll()
                            .then (categories => {

                                // Para ver los productos por categoria
                                let productsCategory = {}
                                categories.forEach(oneCategory => { 
                                    
                                    let categoryCount = 0
                                    products.forEach(oneProduct => {
                                        if (oneProduct.category.name == oneCategory) {
                                            categoryCount = categoryCount + 1
                                        }
                                    });
                                    //Agrega una propiedad con el nombre de la categoria y la cantidad de productos de esa categoria
                                    productsCategory[(oneCategory.name)] = categoryCount

                                    categoryCount = 0
                                })

                                // Arma un nuevo objeto literal con informacion de los productos
                                let newProducts = []
                                products.forEach(oneProduct => {
                                    oneProduct.setDataValue("detail", "/products/" + oneProduct.id_product)
                                    let newProduct = {
                                        id: oneProduct.id_product,
                                        name: oneProduct.name,
                                        detail: oneProduct.detail,
                                    }
                                    newProducts.push(newProduct)
                                });

                                // Arma lo que se envia en la API
                                let apiResponse = {
                                    count: products.length,
                                    countByCategory: productsCategory,
                                    products: newProducts,
                                }    
                                
                                // Envio de la informacion
                                res.send(apiResponse)                      
                            
                            });
                    })
                    .catch(error => console.log(error))
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
                
                oneProduct.setDataValue("image URL", '/images/products/' + oneProduct.image) //Agrega la URL de la imagen del producto
                
                res.send(oneProduct)

            })
            .catch(error => console.log(error))
    },



};
module.exports = controller;