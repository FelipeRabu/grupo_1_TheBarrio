import React from 'react';
//import React, {Component} from 'react';  //ESTO HAY QUE USAR PARA APIs
import PropTypes from 'prop-types'


function TotalPanel (props) {
    
    return (
        
            <div className="col-12 col-sm-6 col-lg-4" className="product-container">              
                <section className="product-box">

                    <a href="#"> 
                       
                        {/*PRECIO, DESCUENTO y NOMBRE*/}
                        <article className="product-box_data">
                            <h2>{props.name}</h2>
                            <p>Cantidad creada:</p>  
                        </article>

                        {props.children}

                    </a>
                </section>          
            </div>
    )
}

TotalPanel.defaultProps = {
    name: "Esta prop esta vacia"
}

TotalPanel.propTypes = {
    name: PropTypes.string
}

export default TotalPanel;