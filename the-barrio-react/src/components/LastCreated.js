import React, { Component } from "react";

class LastCreated extends Component {

    constructor(props) {
        super(props);
        this.state = 
            {
                productsApi:"",
            }
    }

    apiCall(url, handler) {
        fetch(url)
            .then(response => response.json())
            .then(data => handler(data))
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.apiCall('http://localhost:3000/api/products', this.lastProduct);
    }
        
    lastProduct = (data) => {
        this.setState( 
            {
                productsApi: data.products.pop()
            }
        )
    } 


render () {

    let { productsApi } = this.state

    return (
        <div className={["col-6", "product-container"]}>
            <section className="product-box">
                <div className="card-body">
                    <figure className="product-box_image">
                        <img src={productsApi.imageURL} alt="imagen de producto" />
                    </figure>
                    <article className="product-box_data">
                    <ul>
                        <li><h2>{productsApi.name}</h2></li>
                        <li>Tipo: {productsApi.category}</li>
                        <li>Talle: {productsApi.size}</li>
                        <li>Color: {productsApi.color}</li>
                        <li>Artista: {productsApi.artist}</li>
                        <li>Diseño: {productsApi.design}</li>
                    </ul>
                    </article>
                </div>
            </section>
        </div>
    )
};
}

export default LastCreated;