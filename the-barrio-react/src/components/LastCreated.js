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

        <div className="col-xl-6">
            <div className="card mb-4">
                <div className="card-header"><i className="fas fa-database mr-1"></i>Ultimo producto creado</div>
                
                <div className="row card-body">

                    <div className="col-12 col-md-6 col-xl-6">
                    <img src={productsApi.imageURL} alt="imagen de producto" />
                    </div>

                    <div className="col-12 col-md-6 col-xl-6">
                    <h5 className="card-title">{productsApi.name}</h5>
                    <ul>
                        <li>Tipo: {productsApi.category}</li>
                        <li>Talle: {productsApi.size}</li>
                        <li>Color: {productsApi.color}</li>
                        <li>Artista: {productsApi.artist}</li>
                        <li>Diseño: {productsApi.design}</li>
                    </ul> 
                    </div>
                
                </div>
            
            </div>
        </div>
        
    )
};
}

export default LastCreated;