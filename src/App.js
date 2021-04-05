import React from 'react'
import {Switch, Route, HashRouter} from 'react-router-dom'
import PrivateRoute from './components/PrivateRouteComponent'
import Alert from './components/AlertComponent'

import Auth from './pages/Auth'
import Home from './pages/Home'
import PageNotFound from './pages/404'

function App() {
  return (
      <HashRouter>
        <Alert/>
        <Switch>
          <PrivateRoute exact path={'/'} component={Home}/>
          <Route path={'/auth'} component={Auth}/>
          <Route path='*' component={PageNotFound}/>
        </Switch>
      </HashRouter>
  );
}

export default App;
