import React, {Component} from 'react';  //ESTO HAY QUE USAR PARA APIs
import ProductImage from './ProductImage';


class LastCreated extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lastProduct: "",
        }
    }

    apiCall (url, handler) {
        fetch(url)
            .then( response => response.json())
            .then( data => handler(data))
            .catch(error => console.log(error))
    }
    
    componentDidMount() {
        this.apiCall("http://localhost:3000/api/products", this.saveLastProduct)
    }

    //Arrow function es necesario para metodos que usan setState
    saveLastProduct = (data) => {
        console.log(data)
        this.setState( 
            {
                lastProduct: data.products.pop()
            }
        )
    }
    
    render () {

        return (
            
                <div className={["col-12", "product-container"]}>              
                    <section className="product-box">

                            
                            
                            {/*IMAGEN*/}
                            <figure className="product-box_image">
                                <img src="/images/products/" alt="imagen de producto" />
                            </figure>
                            {/*PRECIO, DESCUENTO y NOMBRE*/}
                            <article className="product-box_data">
                                <h2>Nombre: {/*this.lastProduct.name*/}</h2>
                                <span>Precio</span>
                                <p>Descuento</p>  
                            </article>
                    </section>          
                </div>
        )
    }
}

export default LastCreated;