import React, {Component} from 'react'

export class Modal extends Component {

    state = {
        active: false,
        disable: true
    }

    componentDidMount() {
        document.addEventListener('activateModal', this._active, false)
        document.addEventListener('deactivateModal', this._deactive, false)
    }

    _active = (e) => {
        console.log(e.detail)
        this._children = e.detail
        this.setState({disable: false})
        setTimeout(() => {
            this.setState({active: true})
        }, 100)
    }

    _deactive = (e) => {
        this.setState({active: false})
        setTimeout(() => {
            this.setState({disable: true})
        }, 500)
    }

    render() {
        let activeClass = (this.state.active) ? 'active' : ''
        let disableClass = (this.state.disable) ? 'disabled' : ''
        return(
            <div className={"modal " + disableClass + " " + activeClass}>
                <div className="overlay" onClick={e=>document.dispatchEvent(new Event('deactivateModal'))}/>
                <div className="modal-content">
                    {this._children}
                </div>
            </div>
        )
    }
}
