import React, {Component} from 'react'
import {Select} from '../components/elements.jsx'
import {Link, browserHistory} from 'react-router'

export class Home extends Component {

    state = {
        name: 'User',
        rWField: 'Read',
        duration: 'Jan-Feb',
        isRead: true
    }

    _options = [
        {value: 'Read', label: 'Read'},
        {value: 'Write', label: 'Write'}
    ]

    _durations = [
        {value: 'janFeb', label: 'Jan-Feb'},
        {value: 'febMar', label: 'Feb-Mar'},
        {value: 'marApr', label: 'Mar-Apr'},
        {value: 'aprMay', label: 'Apr-May'},
        {value: 'mayJune', label: 'May-Jun'},
        {value: 'junJul', label: 'Jun-Jul'},
        {value: 'julAug', label: 'Jul-Aug'},
        {value: 'augSep', label: 'Aug-Sep'},
        {value: 'sepOct', label: 'Sep-Oct'},
        {value: 'octNov', label: 'Oct-Nov'},
        {value: 'novDec', label: 'Nov-Dec'},
    ]

    render() {
        return(
            <div className="home">
                <h1>Welcome {this.state.name} !!</h1>
                <Select
                    className="field"
                    options={this._options}
                    value={this.state.rWField}
                    onChange={val=>this._onChange(val)}
                />
                <Select
                    name="duration"
                    className="duration-field"
                    value={this.state.duration}
                    options={this._durations}
                    onChange={val=>this._onDurationChange(val)}
                />
                <button className="submit" onClick={this._handleClick}>proceed ></button>
            </div>
        )
    }

    _onChange = (val) => {
        if(!val) return this.setState({rWField: ''})
        if(val == 'Read') this.setState({rWField: val, isRead: true})
        else this.setState({rWField: val, isRead: false})
        console.log(val)
    }

    _onDurationChange = (val) => {
        if(!val) return this.setState({duration: ''})
        this.setState({duration: val})
        console.log(val)
    }

    _handleClick = () => {
        browserHistory.push('duration/'+this.state.rWField+"/"+this.state.duration)
    }
}
