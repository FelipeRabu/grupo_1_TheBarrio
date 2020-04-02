const db = require('../../database/models')
const sequelize = db.sequelize


const controller = {

    // =============== LIST de todos los productos ===============
    list: (req, res) => {
        
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
                        let categoryCount = 0
                        categories.forEach(oneCategory => { 
                            products.forEach(oneProduct => {
                                if (oneProduct.category.name == oneCategory.name) {
                                    categoryCount = categoryCount + 1
                                }
                            });
                            //Agrega una propiedad con el nombre de la categoria y la cantidad de productos de esa categoria
                            productsCategory[(oneCategory.name)] = categoryCount
                            categoryCount = 0
                        })

                        // Arma un nuevo array con obj literal es con informacion de los productos
                        let newProducts = []
                        products.forEach(oneProduct => {
                            oneProduct.setDataValue("detail", "http://localhost:3000/api/products/" + oneProduct.id_product)
                            oneProduct.setDataValue("imageURL", 'http://localhost:3000/images/products/' + oneProduct.image) //Agrega la URL de la imagen del producto
                            let newProduct = {
                                id: oneProduct.id_product,
                                name: oneProduct.name,
                                category: oneProduct.category.name,
                                size: oneProduct.size.name,
                                color: oneProduct.color.name,
                                artist: oneProduct.artist.first_name +" "+ oneProduct.artist.last_name,
                                design: oneProduct.design.name,
                                price: oneProduct.price,
                                discount: oneProduct.discount,
                                detail: oneProduct.get('detail'), //Cuando hago un setDataValue es una propiedad privada. No se puede acceder con un punto (.), hay que acceder con get
                                imageURL: oneProduct.get('imageURL'),
                            }
                            newProducts.push(newProduct)
                        });

                        // Arma un obj literal con lo que se envia en la API
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
			      
    },

    // =============== DETAIL para un unico producto ===============
    detail: (req, res) => {
        let idURL = req.params.productId 

        db.Products
            .findByPk(
                idURL,
                {
                include: ['color', 'category', 'size', 'artist','design']
                }
            )
            .then (oneProduct => {     
                
                oneProduct.setDataValue("imageURL", 'http://localhost:3000/images/products/' + oneProduct.image) //Agrega la URL de la imagen del producto
                
                let newProduct = {
                    id: oneProduct.id_product,
                    name: oneProduct.name,
                    color: oneProduct.color.name,
                    category: oneProduct.category.name,
                    size: oneProduct.size.name,
                    artist: oneProduct.artist.first_name,
                    design: oneProduct.design.name,
                    imageURL: oneProduct.get('imageURL'),
                }

                res.send(newProduct)

            })
            .catch(error => console.log(error))
    },


};
module.exports = controller;