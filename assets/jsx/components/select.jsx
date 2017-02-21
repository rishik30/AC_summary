import React, {Component} from 'react'

export class Select extends Component {

    state = {
        active: false,
        value: null
    }

    render() {
        let activeClassName = this.state.active ? 'active' : ''
        return(
            <div className={"select " + this.props.className}>
                <input
                    name={this.props.name}
                    type="text"
                    value={this.props.value}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                />
                <Options
                    options={this.props.options}
                    class={activeClassName}
                    handleChange={this._onChange}
                />
            </div>
        )
    }

    _onFocus = () => {
        console.log('focus');
        this.setState({active: true})
    }

    _onBlur = () => {
        console.log('blur');
        this.setState({active: false})
    }

    _onChange = (val) => {
        console.log(val);
        this.props.onChange(val)
    }
}

class Options extends Component {

    _options = this.props.options

    render() {
        return(
            <ul className="options">
                {this._options.map((option, i) => {
                    return(
                        <li key={i} className={"option " + this.props.class} onClick={(e)=>this._handleChange(option)}>{option.label}</li>
                    )
                })}
            </ul>
        )
    }

    _handleChange = (val) => {
        console.log('val', val)
        this.props.handleChange(val)
    }
}
