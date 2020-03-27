import React from 'react';
//import React, {Component} from 'react';


function TotalPanel (props) {
    
    return (
        
            <div class="col-12 col-sm-6 col-lg-4" class="product-container">              
                <section class="product-box">

                    <a href="#"> 
                       
                        {/*PRECIO, DESCUENTO y NOMBRE*/}
                        <article class="product-box_data">
                            <h2>Productos</h2>
                            <span>Descuento</span>
                            <p>Nombre</p>  
                        </article>
                    </a>
                </section>          
            </div>
	)
}

export default TotalPanel;