import React, {Component} from 'react'
import 'whatwg-fetch'

export class DailyACInfo extends Component {

    state = {
        data: {}
    }

    componentWillMount() {
        document.dispatchEvent(new Event("activateLoader"))
    }

    componentDidMount() {
        let data = this.props.data
        console.log('daily ac info data', data[0])
        if(data.length>0) {
            let dataItem = data[0]
            this.setState({data: dataItem})
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('props changed', nextProps.data)
        document.dispatchEvent(new Event("activateLoader"))
        if(nextProps.data.length>0) {
            let dataItem = nextProps.data[0]
            this.setState({data: dataItem})
        }
        else {
            this.setState({data: {}})
        }
    }

    render() {
        console.log('state data', this.state.data)
        let data = this.state.data.items
        // data.dailyExpense = (!data) ? [] : data.dailyExpense
        let heading = (!this.state.data.items) ? 'Sorry!! No data for this Date' : 'Account Summary'
        // if(!data.items) heading
        return(
            <div className="daily-ac-info">
                <h1>{heading}</h1>
                {this._renderDetails()}
            </div>
        )
    }

    _renderDetails = () => {
        let data = this.state.data.items
        if(!data) return null
        let debitAmount = (data.isDebit) ? (data.transactionAmount) : 0
        let creditAmount = (data.isCredit) ? (data.transactionAmount) : 0
        // let dailyExpense = data.dailyExpense
        return (
            <div className="account-wrapper">
                <article className=" info bank-account-info">
                    <h3>Bank A/C Details: </h3>
                    <div className="details">
                        <p>Debit : <em>{debitAmount}</em> ({data.transactionDesc})</p>
                        <p>Credit : <em>{creditAmount}</em> ({data.transactionDesc})</p>
                        <p>A/C Balance : <em>{data.accountBalance}</em>/-</p>
                    </div>
                </article>
                <div className="break" />
                <article className="info wallet-account-info">
                    <h3>Wallet Details: </h3>
                    <div className="details">
                        {data.dailyExpense.map((exp, i) => {
                            return <p key={i}>{exp.desc} <em>{exp.amount}</em></p>
                        })}
                        <p>Wallet Balance : <em>{data.walletBalance}</em>/-</p>
                    </div>
                </article>
            </div>
        )
    }
}
