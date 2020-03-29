import React from 'react';
import PropTypes from 'prop-types'


function TotalPanel (props) {
    
    return (
        
            <div className={["col-12 col-sm-6 col-lg-4", "product-container"]}>   {/*Para pasar dos clases se escribe asi*/}
                <section className="product-box">

                       
                        {/*PRECIO, DESCUENTO y NOMBRE*/}
                        <article className="product-box_data">
                            <h2>{props.name}</h2>
                            <p>Cantidad creada:</p>  
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