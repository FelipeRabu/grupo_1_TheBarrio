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

const controller = {
	root: (req, res) => {

		let contenidoJSON = fs.readFileSync(productsFilePath, 'utf-8') 
        let arrayProducts = JSON.parse(contenidoJSON)
        res.render('index', {arrayProducts})
	},

	producto: (req, res) => {
		res.render('productDetail');
		
	},

	cart: (req, res) => {
		res.render('cart');
		
	},

	registro: (req, res) => {
		res.render('register');
		
	},

	cargaProducto: (req, res) => {
		res.render('productAdd');
		
	},

	artistas: (req, res) => {
		res.render('artistas');
		
	},
};

module.exports = controller
