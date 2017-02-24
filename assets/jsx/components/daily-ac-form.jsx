import React, {Component} from 'react'
import {RadioElement} from './elements.jsx'

export class DailyACForm extends Component {

    state = {
        field: '',
        credit: false,
        debit: false,
        NT: false,
        transactionAmount: 0,
        dailyAC: []
    }

    _dailyAC = []

    render() {
        let activeString = (this.state.credit || this.state.debit) ? 'active' : ''
        return(
            <div className="daily-ac-form inner-window">
                <h1>Update Account</h1>
                <h2 className="date">9 Feb 2017</h2>
                <div className="form">
                    <h2>savings A/C</h2>
                    <div className="radio-input">
                        <RadioElement
                            label="credit"
                            active={this.state.credit}
                            onClick={e=>this.setState({credit: true, debit:false, NT:false})} />
                        <RadioElement
                            label="debit"
                            active={this.state.debit}
                            onClick={e=>this.setState({credit: false, debit: true, NT: false})} />
                        <RadioElement
                            label="no transaction"
                            active={this.state.NT}
                            onClick={e=>this.setState({credit: false, debit: false, NT: true})} />
                    </div>
                    <InputField
                        name="amount"
                        className={"amount " + activeString}
                        value={this.state.transactionAmount}
                        onChange={val=>this.setState({transactionAmount: val})} />
                    <div className="break" />
                    <h2>Daily Wallet A/C</h2>
                    {this.state.dailyAC}
                    <button className="add" onClick={this._addDailyInput}>add</button>
                    <input type="file" />
                </div>
            </div>
        )
    }

    _addDailyInput = () => {
        const inputElm = this.state.dailyAC.concat(<DailyInput />)
        console.log(inputElm)
        this.setState({dailyAC: inputElm})
    }
}

class DailyInput extends Component {

    render() {
        return(
            <div className="daily-input">
                <InputField
                    name="amount"
                    className="daily-input-item"
                    // value=""
                    onChange={val=>console.log(val)} />
                <InputField
                    name="description"
                    className="daily-input-item"
                    // value=""
                    onChange={val=>console.log(val)} />
            </div>
        )
    }
}

class InputField extends Component {

    render() {
        return(
            <div className={"input-field " + this.props.className}>
                <label>{this.props.name}</label>
                <input type="text" value={this.props.value} onChange={e=>this.props.onChange(e.target.value)} />
            </div>
        )
    }
}
