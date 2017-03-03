import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import 'whatwg-fetch'
var moment = require('moment')

import {DailyACInfo} from '../components/daily-ac-info.jsx'

export class BigCalendar extends Component {

    state = {
        firstMonth: '',
        secondMonth: '',
        startDate: 16,
        days: []
    }

    componentDidMount() {
        let months = this.props.duration.split("-")
        this._renderCalendar()
        // this.setState({firstMonth: months[0], secondMonth: months[1]})
    }

    _allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    _monthWithMoreDays = [
        "Jan",
        "Mar",
        "May",
        "Jul",
        "Sep",
        "Nov"
    ]

    _monthWithLessDays = [
        "Apr",
        "Jun",
        "Aug",
        "Oct",
        "Dec"
    ]

    _days = []

    _months = this.props.duration.split("-")

    render() {
        return(
            <div className="big-calendar inner-window">
                <div className="calendar-wrapper">
                    <h1>{this.props.duration+" "}<span>{new Date().getFullYear()}</span></h1>
                    <div className="calendar">

                        {this._days.map((day, i) => {
                            return(
                                <div className="calendar-tile" key={i}>
                                    <div className="encircle">
                                        {/* {this._returnField(day)} */}
                                        <p onClick={e=>this._handleClick(e, day)}>{day}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    _returnMonth = (day) => {
        if(parseInt(day)>=16) return this._months[0]
        else return this._months[1]
    }

    _returnDays = (month) => {
        if(month === 'Feb') {
            if(new Date().getFullYear()%4 == 0) return 29
            else return 28
        }
        if(this._monthWithMoreDays.indexOf(month)>-1) return 31
        else return 30
    }

    _renderCalendar = () => {
        let firstMonth = this._months[0]
        let allDays = this._returnDays(firstMonth)
        let date = this.state.startDate
        while(date<=allDays) {
            this._days.push(date)
            date+=1
        }
        console.log(this._days)
        let init = 1
        while(init<16) {
            this._days.push(init)
            init+=1
        }
        this.setState({firstMonth, days: this._days})
    }

    _handleClick = (e, day) => {
        let month = this._returnMonth(day)
        let numericMonth = this._allMonths.indexOf(month)+1
        let year = new Date().getFullYear()
        if(this.props.type == "Read") {
            // browserHistory.push("/duration/Read/"+this.props.duration+"/"+day)
            // return <p>{day}</p>
            this._showDetails(day, numericMonth, year)
        }
        else browserHistory.push("/daily-ac/"+day+"-"+month)
    }

    _showDetails = (date, month, year) => {
        let fullDate = new Date(year+'-'+month+'-'+date)
        let dateToBePassed = moment(fullDate).toISOString()
        console.log(fullDate)
        console.log(dateToBePassed)
        let url = '/getData/'+dateToBePassed
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data)
                document.dispatchEvent(new CustomEvent('activateModal', {detail: (<DailyACInfo data={data} />)}))
            })
            .catch(e=>console.log('error', e))


    }

}
