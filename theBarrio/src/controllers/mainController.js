const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//Requiriendo el archivo index.js que se instalo cuando pusimos "sequelize init"
const db = require('../database/models')
const sequelize = db.sequelize

const controller = {
	root: (req, res) => {
        db.Products
            .findAll({
                include: ['color', 'category', 'size', 'artist','design']
            })
            .then (products => {     
                return res.render('index', { products })
            })
            .catch(error => console.log(error))
    },

	cart: (req, res) => {
		const isLogged = req.session.userId ? true : false;
        db.Users
			.findByPk(req.session.userId)
			.then(userLogin => { 
				res.render('cart', { userLogin, isLogged })
			})
			.catch(error => console.log(error))   
		
	},

};

module.exports = controller
