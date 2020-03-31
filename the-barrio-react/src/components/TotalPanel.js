import React from 'react';
import PropTypes from 'prop-types'


function TotalPanel (props) {
    
    return (
        
            <div className={["col-10 col-sm-3 col-lg-3", "product-container"]}>   {/*Para pasar dos clases se escribe asi*/}
                <section className="product-box">

                       
                        {/*PRECIO, DESCUENTO y NOMBRE*/}
                        <article className="product-box_data">
                            <h2>{props.name}</h2>
                            <p>Cantidad creada:{props.quantity}</p>  
                        </article>

                        {props.children}

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