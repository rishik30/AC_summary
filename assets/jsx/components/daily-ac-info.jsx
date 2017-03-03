import React, {Component} from 'react'
import 'whatwg-fetch'

export class DailyACInfo extends Component {

    state = {
        data: {}
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
        let data = this.state.data
        let heading = (!data.items) ? 'Sorry!! No data for this Date' : 'Account Summary'
        // if(!data.items) heading
        return(
            <div className="daily-ac-info">
                <h1>{heading}</h1>
            </div>
        )
    }
}
