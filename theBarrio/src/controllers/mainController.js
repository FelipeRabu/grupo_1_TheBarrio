const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
function readHTML (fileName) {
	let filePath = path.join(__dirname, `/../views/${fileName}.html`);
	let htmlFile = fs.readFileSync(filePath, 'utf-8');
	return htmlFile;
}

const controller = {
	root: (req, res) => {
		let html = readHTML('index');
		res.send(html);
	},

	producto: (req, res) => {
		let html = readHTML('productDetail');
		res.send(html);
	},

	carrito: (req, res) => {
		let html = readHTML('productCart');
		res.send(html);
	},

	registro: (req, res) => {
		let html = readHTML('register');
		res.send(html);
	},

	cargaProducto: (req, res) => {
		let html = readHTML('productAdd');
		res.send(html);
	},

	artistas: (req, res) => {
		let html = readHTML('artistas');
		res.send(html);
	},
};

module.exports = controller
