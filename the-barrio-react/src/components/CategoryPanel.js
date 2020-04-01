import React, { Component } from "react";

class CategoryPanel extends Component {


    constructor(props) {
        super(props);
        this.state = 
            {
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
        this.apiCall('http://localhost:3000/api/products', this.getCategories);
    }
        
    getCategories = (data) => {
        this.setState( 
            {
                categories: data.countByCategory
            }
        )
    }
    
    render () {
    let { categories } = this.state
    //let { propNames } = Object.keys(categories)

    
        return (

            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header"><i className="fas fa-hat-cowboy-side mr-1"></i>Categorias</div>
                    <div className="card-body">

                            <article className="border-bottom">
                                <h5>Remeras</h5>
                                <p className="category-amount">{categories.Remera}</p>                              
                            </article>

                            <article className="border-bottom">
                                <h5>Buzos</h5>
                                <p className="category-amount">{categories.Buzo}</p>                              
                            </article>

                            <article>
                                <h5>Camisas</h5>
                                <p className="category-amount">{categories.Camisa}</p>                              
                            </article>

                    </div>
                </div>
            </div>

        )
    }
}


export default CategoryPanel;