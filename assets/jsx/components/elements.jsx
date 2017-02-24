import React, {Component} from 'react'

export class Select extends Component {

    state = {
        active: false
    }

    render() {
        let activeClassName = this.state.active ? 'active' : ''
        return(
            <div className={"select " + this.props.className} onFocus={this._onFocus} onBlur={this._onBlur} tabIndex={-1}>
                <input name={this.props.name} value={this.props.value} />
                <ul className={"options "+activeClassName}>
                    {this.props.options.map((option, i) => {
                        return(
                            <li key={i} className="option" onClick={e=>this._handleChange(option.label)}>{option.label}</li>
                        )
                    }, this)}
                </ul>
            </div>
        )
    }

    _onFocus = () => {
        this.setState({active: true})
    }

    _onBlur = () => {
        this.setState({active: false})
    }

    _handleChange = (val) => {
        this.props.onChange(val)
        this.setState({active: false})
    }
}

export class RadioElement extends Component {

    render() {
        let activeClass = (this.props.active) ? 'active' : ''
        return(
            <div className={"radio-element " + activeClass}  onClick={this.props.onClick}>
                <p>{this.props.label}</p>
                <div className="radio" />
            </div>
        )
    }
}
