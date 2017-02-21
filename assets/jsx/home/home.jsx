import React, {Component} from 'react'
// import Select from 'react-select'
// import 'react-select/dist/react-select.css'
import {Select} from '../components/select.jsx'

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
                {/* <Select
                    name="read-write"
                    className="read-write-field"
                    value={this.state.rWField}
                    options={this._options}
                    simpleValue={true}
                    onChange={this._onChange}
                />
                <Select
                    name="duration"
                    className="duration-field"
                    value={this.state.duration}
                    options={[
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
                    ]}
                    onChange={this._onDurationChange}
                    multi={this.state.isRead}
                /> */}
                <Select
                    className="field"
                    options={[
                        {value: 'Read', label: 'Read'},
                        {value: 'Write', label: 'Write'}
                    ]}
                    value={this.state.rWField}
                    onChange={val=>this.setState({rWField: val})}
                />
            </div>
        )
    }

    _onChange = (val) => {
        if(!val) return this.setState({rWField: ''})
        if(val == 'Read') this.setState({rWField: val, isRead: true})
        else this.setState({rWField: val, isRead: false})
        console.log(val)
    }

    _onDurationChange = (val, selected) => {
        if(!val) return this.setState({duration: ''})
        this.setState({duration: val.label})
        console.log(val, selected)
    }
}
