import React, {Component} from 'react'
import '../scss/index.scss'
var WebFont = require('webfontloader')

export class App extends Component {

    componentDidMount() {
        WebFont.load({
            google: {
                families: ['Raleway', 'Nunito Sans:200, 300, 400, 600, 700']
            }
        })
    }

    render() {
        return(
            <div className="main">
                {/* <Home /> */}
                {this.props.children}
            </div>
        )
    }
}
