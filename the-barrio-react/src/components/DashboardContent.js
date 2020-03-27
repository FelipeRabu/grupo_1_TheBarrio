import React from 'react';
import TotalPanel from './TotalPanel';
import LastCreated from './LastCreated';
import CategoryPanel from './CategoryPanel';

//Esta bien esto? NO
//let DB = 'http://localhost:3000/api/products'

//Para consumir APIS:
//Hay que hacer llamados del tipo fetch que consuman la api. EN los componentes que haga llamados a la api tienen que ser ocponentes de clase

function DashboardContent(props) {

    return (
		<div class="container products-wrapper">
            <div class="row">
                <div class="col-12">
                    <h2 class="products-title">Total creados</h2>
                </div>
                <TotalPanel />
                <TotalPanel />
                <TotalPanel />
                
                <div class="col-12">
                    <h2 class="products-title">Ultimo creado</h2>
                </div>
                <LastCreated />

                <div class="col-12">
                    <h2 class="products-title">Categorias</h2>
                </div>
                <CategoryPanel />

                <div class="col-12">
                    <h2 class="products-title">Listado de productos</h2>
                </div>
                
                

            </div>
        </div>
	)
}

export default DashboardContent;