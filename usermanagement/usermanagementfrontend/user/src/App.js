import React from 'react';
import UserProfile from './containers/UserProfile/UserProfile'
import { Route, Switch } from 'react-router-dom'
import Login from './containers/LoginPage/LoginPage'
import SearchAppBar from './containers/SearchAppBar/SearchAppBar'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions/index'
import ReactGA from 'react-ga';


class App extends React.Component {

  componentDidMount() {
    ReactGA.set({ userId: this.props.userId });
    this.props.auth()
  }

  render() {
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
}

const matchStateToProps = state => {
  return {
    userId: state.aReducer.user ? state.aReducer.user.id : ""
  }
}

const matchDispatchToProps = dispatch => {
  return {
    auth: () => dispatch(actionCreators.auth())
  }
}


export default connect(matchStateToProps, matchDispatchToProps)(App);
