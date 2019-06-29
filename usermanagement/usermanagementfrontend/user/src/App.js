import React from 'react';
import UserProfile from './containers/UserProfile/UserProfile'
import { Route, Switch } from 'react-router-dom'
import Login from './containers/LoginPage/LoginPage'
import SearchAppBar from './containers/SearchAppBar/SearchAppBar'

function App() {
  return (
    <>
    <SearchAppBar />
    <Switch>
      <Route
          exact
          path="/u/:userId/:userName"
          component={UserProfile} />
        <Route
            exact
            path="/login"
            component={Login} />
      <Route render={() => <h1>404 page is yet to be found</h1>} />
    </Switch>
    </>
  );
}

export default App;
