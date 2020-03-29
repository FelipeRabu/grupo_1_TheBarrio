import React, {Component} from 'react';  //ESTO HAY QUE USAR PARA APIs


class ProductImage extends Component {


    constructor(props) {
        super(props)
        this.state = {
            image: ""
        }
    }

    apiCall (url, handler) {
        fetch(url)
            .then( response => response.json())
            .then( data => handler(data))
            .catch(error => console.log(error))
    }
    
    componentDidMount() {
        this.apiCall("http://localhost:3000/api/products/1", this.showImage)
    }

    //Arrow function es necesario para metodos que usan setState
    showImage = (data) => {
        console.log(data)
        this.setState( 
            {
            image: data.imageURL
            }
        )
    }

    render() {

        return (
            <React.Fragment>

                <p>Imagen del producto</p>
                <img src={this.state.image}></img>
                
            </React.Fragment>
        )
    }
}

export default ProductImage;