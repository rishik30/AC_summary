import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {App}            from './app.jsx'
import {Home}           from './home/home.jsx'
import {Duration}       from './duration/duration.jsx'
import {DailyACForm}    from './components/daily-ac-form.jsx'
import {DailyACInfo}    from './components/daily-ac-info.jsx'

var routes = (
    <Router history={browserHistory}>
        <Route path="/"     component={App}>
            <IndexRoute     name="home"                    component={Home} />
            <Route          path="/duration"               component={Duration}>
                <Route      path=":type/:months"           component={Duration} />
                <Route      path=":type/:months/:day"      component={DailyACInfo} />
            </Route>
            <Route          path="daily-ac/:day"           component={DailyACForm} />
        </Route>
    </Router>

)

export default routes;
