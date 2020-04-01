//import React from 'react';
import React, {Component} from 'react';  //ESTO HAY QUE USAR PARA APIs
import TotalPanel from './TotalPanel';
import LastCreated from './LastCreated';
import CategoryPanel from './CategoryPanel';
import ProductList from './ProductList';


//Esta bien esto? NO
//let DB = 'http://localhost:3000/api/products'

//Para consumir APIS:
//Hay que hacer llamados del tipo fetch que consuman la api. EN los componentes que haga llamados a la api tienen que ser ocponentes de clase

class DashboardContent extends Component {

    // ========== CODIGO DE PRUEBA (se peude borrar) ==========
    /*
    lanzarAlerta () {
        alert("Soy una alerta de prueba");
    }

    changeColor () {
        document.querySelector("h2").style.backgroundColor = "Yellow";
    }

    removeColor () {
        document.querySelector("h2").style.backgroundColor = "";
    }
    */
    // ========== FIN CODIGO DE PRUEBA ==========

    constructor(props) {
        super(props);
        this.state = 
            {
                totalProducts:"",
                categories:"",
                totalUsers:"",

            }
    }

    apiCall(url, handler) {
        fetch(url)
            .then(response => response.json())
            .then(data => handler(data))
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.apiCall('http://localhost:3000/api/products', this.allProducts);
        this.apiCall('http://localhost:3000/api/users', this.allUsers);
    }
        
    allProducts = (data) => {
        this.setState( 
            {
                totalProducts: data.count,
                categories: data.countByCategory,
            }
        )
    }

    allUsers = (data) => {
        this.setState( 
            {
                totalUsers: data.count
            }
        )
    }




    render() {

        let { totalProducts, categories, totalUsers } = this.state
        

        return (
            <div className="container products-wrapper">
                <div className="row">

                    {/*===== TOTALES =====*/}
                    <div className="col-12">
                        <h2 className="products-title" onMouseOver={this.changeColor} onMouseOut={this.removeColor}>Total creados</h2>
                    </div>
                    {/*
                    <TotalPanel name="Poductos">
                        <h4>Prueba de children</h4>
                    </TotalPanel>
                    */}
                    <TotalPanel name="Productos" quantity={totalProducts} />
                    <TotalPanel name="Usuarios" quantity={totalUsers} />
                    <TotalPanel name="Categorias" quantity={Object.keys(categories).length} />
                
                    {/*===== ULTIMO PRODUCTO =====*/}
                    <div className="col-12">
                        <h2 className="products-title" onClick={this.lanzarAlerta}>Ultimo creado</h2>
                    </div>
                    <LastCreated />

                    {/*===== CATEGORIAS =====*/}
                    <div className="col-12">
                        <h2 className="products-title">Categorias</h2>
                    </div>
                    <CategoryPanel />              
                
                    {/*===== LISTADO DE PRODUCTOS =====*/}
                    <div className="col-12">
                        <h2 className="products-title">Listado de productos</h2>
                    </div>
                    <div className="col-12">
                    <ProductList />
                    </div>

                </div>


                
                    
            </div>
        )
    }
}

export default DashboardContent;