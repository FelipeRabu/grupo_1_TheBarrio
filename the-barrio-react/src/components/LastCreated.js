import React, { Component } from "react";

class LastCreated extends Component {

    constructor(props) {
        super(props);
        this.state = 
            {
                lastProductCreated:"",
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
                lastProductCreated: data.products.pop()
            }
        )
    } 


render () {

    let { lastProductCreated } = this.state

    return (

        <div className="col-xl-6">
            <div className="card mb-4">
                <div className="card-header"><i className="fas fa-database mr-1"></i>Ultimo producto creado</div>
                
                <div className="row card-body">

                    <div className="col-12 col-md-6 col-xl-6">
                    <img src={lastProductCreated.imageURL} alt="imagen de producto" />
                    </div>

                    <div className="col-12 col-md-6 col-xl-6">
                    <h5 className="card-title">{lastProductCreated.name}</h5>
                    <ul>
                        <li>Categoria: {lastProductCreated.category}</li>
                        <li>Talle: {lastProductCreated.size}</li>
                        <li>Color: {lastProductCreated.color}</li>
                        <li>Artista: {lastProductCreated.artist}</li>
                        <li>Diseño: {lastProductCreated.design}</li>
                    </ul> 
                    </div>
                
                </div>
            
            </div>
        </div>
        
    )
};
}

export default LastCreated;