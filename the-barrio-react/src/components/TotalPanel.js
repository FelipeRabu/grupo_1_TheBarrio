import React from 'react';
import PropTypes from 'prop-types'


function TotalPanel (props) {
    
    return (


        <div className="col-xl-4 col-md-6">
            <div className="card bg-dark text-white mb-4">
                <div className="card-body card-body-fix"><h5>{props.name}</h5></div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="small text-white stretched-link" href="#">
                        Cantidad creada
                    </div>
                    <div className="small text-white">
                        <h3>{props.quantity}</h3>
                    </div>
                </div>
            </div>
        </div>

    )
}

/*
TotalPanel.defaultProps = {
    name: "Esta prop esta vacia"
}

TotalPanel.propTypes = {
    name: PropTypes.string
}
*/

export default TotalPanel;