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
            
                <div className={["col-12", "product-container"]}>              
                    <section className="product-box">

                            <article className="product-box_data">
                                <h2>Remera</h2>
                                <p>{categories.Remera}</p>                              
                            </article>

                            <article className="product-box_data">
                                <h2>Buzo</h2>
                                <p>{categories.Buzo}</p>                              
                            </article>

                            <article className="product-box_data">
                                <h2>Camisa</h2>
                                <p>{categories.Camisa}</p>                              
                            </article>
                    
                    </section>          
                </div>
        
        )
    }
}


export default CategoryPanel;