import React, {Component} from 'react'
import {render} from 'react-dom'
import {Home} from './home/home.jsx'
import '../scss/index.scss'

export class App extends Component {

    render() {
        return(
            <div className="main">
                <Home />
            </div>
        )
    }
}

render(<App />, document.getElementById("my-app"));
