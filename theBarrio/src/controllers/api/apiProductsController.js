const db = require('../../database/models')
const sequelize = db.sequelize


const controller = {
    // Root - Show all products
    list: (req, res) => {
        db.Users
			.findByPk(req.session.userId)
			.then(userLogin => { 
				db.Products
                    .findAll({
                        include: ['color', 'category', 'size', 'artist','design']
                    })
                    .then (products => {   
                        
                        products.forEach(oneProduct => {

                            oneProduct.setDataValue("endpoint", "/products/" + oneProduct.id_product)

                        });
                            
                        let apiResponse = {
                            meta: {
                                status:200,
                                count: products.length,
                                countByCategory:1, //FALTA ESTO!!!
                            },
                            products
                            /*
                            products: {
                                id: products.id_product,
                                name: products.name,
                            }
                            */
                        }    
                    
                        res.send(apiResponse)

                    })
                    .catch(error => console.log(error))
			})
			.catch(error => console.log(error))       
    },



};
module.exports = controller;