import React, {Component} from 'react'
import {Link} from 'react-router'
import 'whatwg-fetch'
import {RadioElement} from './elements.jsx'
var Client = require('node-rest-client').Client
var moment = require('moment')

export class DailyACForm extends Component {

    state = {
        field: '',
        isCredit: false,
        isDebit: false,
        NT: false,
        transactionAmount: 0,
        transactionDesc: '',
        moneyAdded: 0,
        walletBalance: 0,
        accountBalance: 0,
        dailyTransactionInput: [],
        dailyExpense: []
    }

    componentDidMount() {
        // fetch()
    }

    _dailyBankTrans = {amount: 0, desc: ''}

    _allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    render() {
        let activeString = (this.state.isCredit || this.state.isDebit) ? 'active' : ''
        console.log('expense', this.state.dailyExpense)

        return(
            <div className="daily-ac-form inner-window">
                <h1>Update Account</h1>
                <h2 className="date">{this.props.params.day + " " + new Date().getFullYear()}</h2>
                <div className="form">
                    <h2>savings A/C</h2>
                    <div className="radio-input">
                        <RadioElement
                            label="credit"
                            active={this.state.isCredit}
                            onClick={e=>this.setState({isCredit: true, isDebit:false, NT:false})} />
                        <RadioElement
                            label="debit"
                            active={this.state.isDebit}
                            onClick={e=>this.setState({isCredit: false, isDebit: true, NT: false})} />
                        <RadioElement
                            label="no transaction"
                            active={this.state.NT}
                            onClick={e=>this.setState({isCredit: false, isDebit: false, NT: true})} />
                    </div>
                    {/* <InputField
                        name="amount"
                        className={"amount " + activeString}
                        type="number"
                        value={this.state.transactionAmount}
                        onChange={val=>this.setState({transactionAmount: val})} /> */}
                    <DailyInput
                        className={"amount " + activeString} amountField={val=>this.setState({transactionAmount: val})} descriptionField={val=>this.setState({transactionDesc: val})}
                    />
                    <div className="break" />
                    <h2>Daily Wallet A/C</h2>
                    <InputField
                        name="Money added"
                        className="amount active"
                        type="number"
                        value={this.state.moneyAdded}
                        onChange={val=>this.setState({moneyAdded: val})} />
                    {this.state.dailyTransactionInput}
                    <button className="add" onClick={this._addDailyInput}>add</button>
                    <button className="submit save" onClick={this._submit}>save</button>
                    <input type="file" />
                </div>
            </div>
        )
    }

    _addDailyInput = () => {
        let expense = {amount: 0, desc: ""}
        let expenseInput = <DailyInput amountField={val=>expense.amount=val} descriptionField={val=>expense.desc=val} />
        const inputElm = this.state.dailyTransactionInput.concat(expenseInput)
        const expenseArr = this.state.dailyExpense.concat(expense)

        this.setState({dailyExpense: expenseArr})
        this.setState({dailyTransactionInput: inputElm})
    }

    _calculateBalance = () => {
        let accountBalance = parseInt(this.state.accountBalance)
        let walletBalance = this.state.walletBalance
        let dailyExp = 0
        this.state.dailyExpense.map((exp, i) => dailyExp += parseInt(exp.amount))
        if(this.state.isCredit) accountBalance += parseInt(this.state.transactionAmount)
        if(this.state.isDebit) accountBalance -= parseInt(this.state.transactionAmount)
        walletBalance = (walletBalance + this.state.moneyAdded) - dailyExp
        console.log(accountBalance, walletBalance, dailyExp)
        this.setState({accountBalance, walletBalance})
    }

    _submit = () => {
        console.log(this.state)
        this._calculateBalance()
        setTimeout(()=>{
            console.log('after', this.state)
            this._save()
        }, 100)
    }

    _save = () => {
        let currentDate = this.props.params.day.split("-")[0]
        let numericMonth = this._allMonths.indexOf(this.props.params.day.split("-")[1])+1
        let year = new Date().getFullYear()
        let fullDate = new Date(year+'-'+numericMonth+'-'+currentDate)
        console.log(fullDate)
        let dateToBePassed = moment(fullDate).toISOString()
        console.log(dateToBePassed)
        // if(this.state.)
        var client = new Client()
        client.post("http://localhost:3000/saveData", {
            data: {data: this.state, today: dateToBePassed},
            headers: {"Content-Type": "application/json"}
        }, (data, response) => {
            console.log('Data items', data)
            console.log('response success', response)
            document.dispatchEvent(new CustomEvent('activateModal', {detail: (<Success />)}))
        })
    }
}

class DailyInput extends Component {

    render() {
        return(
            <div className="daily-input">
                <InputField
                    name="amount"
                    className={"daily-input-item "+this.props.className}
                    type="number"
                    // value={this.props.amount}
                    onChange={val=>this.props.amountField(val)} />
                <InputField
                    name="description"
                    className={"daily-input-item "+this.props.className}
                    type="text"
                    // value={this.props.description}
                    onChange={val=>this.props.descriptionField(val)} />
            </div>
        )
    }
}

class InputField extends Component {

    render() {
        return(
            <div className={"input-field " + this.props.className}>
                <label>{this.props.name}</label>
                <input type={this.props.type} value={this.props.value} onChange={e=>this.props.onChange(e.target.value)} />
            </div>
        )
    }
}

class Success extends Component {

    render() {
        return(
            <div className="success">
                <h3>Your details are saved successfully !!</h3>
                <p>Go to Home.. Click Below</p>
                <Link to="/"><button className="add" onClick={e=>document.dispatchEvent(new CustomEvent('deactivateModal'))}>home</button></Link>
            </div>
        )
    }
}
