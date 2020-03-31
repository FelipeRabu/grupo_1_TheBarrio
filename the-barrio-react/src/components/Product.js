import React from "react";

function Product (props) {
    return (
        
        <div className={("col-12", "col-sm-6", "col-lg-4", "product-container")}>              
            <section className="product-box">                                        
                    {/*IMAGEN*/}
                    <figure className="product-box_image">
                        <img src={props.image} alt="imagen de producto"></img>
                    </figure>
                    
                    {/*INFORMACION*/}
                    <article className="product-box_data">
                        <h2>${(1-props.discount/100)*props.price}</h2>
                        <span>{props.discount}% OFF</span>
                    </article>

                    {/*NOMBRE*/}    
                    <div className="product-box_data"><p >{props.name}</p></div>                                    
            </section>          
        </div>

    )
}

export default Product;