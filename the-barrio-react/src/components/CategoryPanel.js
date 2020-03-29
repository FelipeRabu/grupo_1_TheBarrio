import React from 'react';

function CategoryPanel (props) {
    
    return (
        
            <div className={["col-12", "product-container"]}>              
                <section className="product-box">

                        {/*IMAGEN*/}
                        <figure className="product-box_image">
                            <img src="/images/products/logo2.png" alt="imagen de producto" />
                        </figure>
                        {/*PRECIO, DESCUENTO y NOMBRE*/}
                        <article className="product-box_data">
                            <h2>Precio</h2>
                            <span>Descuento</span>
                            <p>Nombre</p>  
                        </article>
                </section>          
            </div>
    
    )
}

export default CategoryPanel;