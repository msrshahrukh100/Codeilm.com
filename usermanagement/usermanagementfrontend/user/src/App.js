import React from 'react';
import UserProfile from './containers/UserProfile/UserProfile'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route
          exact
          path="/u/:userId/:userName"
          component={UserProfile} />
      <Route render={() => <h1>404 page is yet to be found</h1>} />
    </Switch>
  );
}

export default App;
