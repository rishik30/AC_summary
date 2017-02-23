import React, {Component} from 'react'
import {BigCalendar} from './_bigCalendar.jsx'

export class Duration extends Component {

    componentDidMount() {
        console.log(this.props.params)
    }

    render() {

        return(
            <div className="duration">
                <BigCalendar
                    duration={this.props.params.months}
                />
            </div>
        )
    }
}
