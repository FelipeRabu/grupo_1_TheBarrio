//import React from 'react';
import React, {Component} from 'react';  //ESTO HAY QUE USAR PARA APIs
import TotalPanel from './TotalPanel';
import LastCreated from './LastCreated';
import CategoryPanel from './CategoryPanel';
import ProductList from './ProductList';


class DashboardContent extends Component {

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

            <div id="layoutSidenav">

                {/* BARRA LATERAL DE NAVEGACION */}
                <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard</a>
                        <div className="sb-sidenav-menu-heading">Addons</div>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                        Charts</a>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                        Tables</a>
                    </div>
                    </div>
                </nav>
                </div>
                {/* /BARRA LATERAL DE NAVEGACION */}

                {/* DASHBOARD CONTENIDO */}
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid">
                            <h1 className="mt-4">Dashboard</h1>

                            <ol className="breadcrumb mb-4">
                            </ol>

                            <div className="row">
                                <TotalPanel name="Productos" quantity={totalProducts} />
                                <TotalPanel name="Usuarios" quantity={totalUsers} />
                                <TotalPanel name="Categorias" quantity={Object.keys(categories).length} />
                            </div>

                            <div className="row">
                                <LastCreated />
                                <CategoryPanel />
                                <ProductList />
                            </div>

                        </div>
                    </main>

                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; The Barrio 2020</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>

                </div>
            </div> 

        )
    }
}

export default DashboardContent;