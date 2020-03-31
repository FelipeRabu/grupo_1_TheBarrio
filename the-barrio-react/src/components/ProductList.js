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

    console.log("=================PRODUCTOS======================")
    console.log(products)
    console.log("=================/PRODUCTOS======================")

        return(

            
            <div className={["container", "products-wrapper"]}>
                    <div className="row">

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

        
        )
    }
}

export default ProductList;