import React, {Component} from 'react'

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

    render() {
        return(
            <div className="big-calendar">
                <div className="calendar-wrapper">
                    <h1>{this.props.duration+" "}<span>{new Date().getFullYear()}</span></h1>
                    <div className="calendar">

                        {this._days.map((day, i) => {
                            return(
                                <div className="calendar-tile">
                                    {/* <h3>{this.state.firstMonth}</h3> */}
                                    <div className="encircle">
                                        <p>{day}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
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
        let firstMonth = this.props.duration.split('-')[0]
        let allDays = this._returnDays(firstMonth)
        let date = this.state.startDate
        while(date<=allDays) {
            this._days.push(date)
            date+=1
        }
        console.log(this._days)
        let init = 1
        while(init<=16) {
            this._days.push(init)
            init+=1
        }
        this.setState({firstMonth, days: this._days})
    }
}
