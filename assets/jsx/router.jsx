import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {App}        from './app.jsx'
import {Home}       from './home/home.jsx'
import {Duration}   from './duration/duration.jsx'

var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute name="home"         component={Home} />
            <Route      path="/duration"    component={Duration}>
                <Route  path=":type/:months"  component={Duration} />
            </Route>
        </Route>
    </Router>

)

export default routes;
