import React from 'react';
import UserProfile from './containers/UserProfile/UserProfile'
import { Route, Switch } from 'react-router-dom'
import Login from './containers/LoginPage/LoginPage'
import SearchAppBar from './containers/SearchAppBar/SearchAppBar'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions/index'
import ReactGA from 'react-ga';
import CommunityPage from './containers/CommunityPage/CommunityPage'
import 'typeface-roboto';

class App extends React.Component {

  componentDidMount() {
    this.props.auth()
  }

  componentDidUpdate(prevProps) {
    if(this.props.userId) {
      ReactGA.set({ userId: this.props.userId });
    }
  }

  render() {
    return (
      <>
      <SearchAppBar />
      <Switch>
      <Route
        exact
        path="/c/:communitySlug"
        component={CommunityPage} />
        <Route
          exact
          path="/u/:userNameId"
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
