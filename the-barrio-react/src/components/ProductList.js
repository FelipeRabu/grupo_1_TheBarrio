import React from 'react';
import Product from './Product';

//Esta bien esto?
let DB = 'http://localhost:3000/api/products'

function ProductList(props) {

    return (
		<div class="container products-wrapper">
            <div class="row">
                <div class="col-12">
                    <h2 class="products-title">Todos los productos</h2>
                </div>

                <Product />

            </div>
        </div>
	)
}

export default ProductList;