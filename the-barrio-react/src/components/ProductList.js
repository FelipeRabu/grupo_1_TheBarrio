import React, { Component } from "react";
import Product from "./Product";



class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = 
            {
                products:"",
                categories:"",
            }
    }

    apiCall(url, handler) {
        fetch(url)
            .then(response => response.json())
            .then(data => handler(data))
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.apiCall('http://localhost:3000/api/products', this.allProducts);
    }
        
    allProducts = (data) => {
        this.setState( 
            {
                products: data.products,
            }
        )
    }
    

    render () {
    let { products } = this.state

        return(


            <div className="col-xl-12">
                <div className="card mb-4">
                    <div className="card-header"><i className="fas fa-tshirt mr-1"></i>Listado de productos</div>
                    <div className="row card-body">

                        
                                {products && products.map((oneProduct,i) => 
                                
                                <Product 
                                    key={i} 
                                    name= {oneProduct.name}
                                    price= {oneProduct.price}
                                    discount= {oneProduct.discount}
                                    image= {oneProduct.imageURL}
                                />
                                )
                                }
                            
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductList;