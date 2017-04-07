import React, {Component} from 'react'
import {Svg} from './svg.jsx'

export default class Loader extends Component {

    state = {
        active: false
    }

    componentDidMount() {
        document.addEventListener("activateLoader", this._activate, false)
        document.addEventListener("deactivateLoader", this._deactivate, false)
        this._activate()
    }

    render() {
        let activeClass = (this.state.active)?("active"):("")
        return(
            <div className={"loader " + activeClass}>
                <Svg src="/img/coin-icon.svg" />
            </div>
        )
    }

    _activate = () => {
        requestAnimationFrame(()=>{
            console.log('ANiMATING')
            this.setState({active: true})
            setTimeout(() => {
                this._deactivate()
            }, 2500)
        })
    }

    _deactivate = () => {
        requestAnimationFrame(()=>{
            console.log('DEANiMATING')
            this.setState({active: false})
        })
        // this._stopAnimation())
    }
}
