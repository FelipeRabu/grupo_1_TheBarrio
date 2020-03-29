import React from 'react';

function LastCreated (props) {
    
    return (
        
            <div className="col-12" className="product-container">              
                <section className="product-box">

                    <a href="#"> 
                        {/*IMAGEN*/}
                        <figure className="product-box_image">
                            <img src="/images/products/" alt="imagen de producto" />
                        </figure>
                        {/*PRECIO, DESCUENTO y NOMBRE*/}
                        <article className="product-box_data">
                            <h2>Precio</h2>
                            <span>Descuento</span>
                            <p>Nombre</p>  
                        </article>
                    </a>
                </section>          
            </div>
	)
}

export default LastCreated;