import React, {Component} from 'react';  //ESTO HAY QUE USAR PARA APIs


class Contador extends Component {


    constructor(props) {
        super(props)
        this.state = {
            number: props.inicial
        }
    }

    increment () {
        this.setState ({number:this.state.number +1})
    }

    render() {

        return (
            <div>
                <h2 className="products-title">Soy un contador: {this.props.inicial}</h2>
                <button onClick={() => this.increment()}>Incrementar</button>
            </div>
        )
    }
}

export default Contador;