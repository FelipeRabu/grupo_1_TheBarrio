import React from "react";


function Product (props) {
    return (
        
        <div class="col-12 col-md-3 col-xl-3">              
            <section>

                {/*IMAGEN*/}
                <figure>
                    <img src={props.image} alt="imagen de producto"></img>
                </figure>

                {/*NOMBRE*/}    
                <div><h5>{props.name}</h5></div> 
                
                {/*INFORMACION*/}
                <ul>
                    <li>${props.price}</li>
                    <li>{props.discount}% descuento</li>
                </ul>
            
            </section>          
        </div>

    )
}

export default Product;