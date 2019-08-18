import React from 'react';
import { Route, Switch } from 'react-router-dom'
import SearchAppBar from './containers/SearchAppBar/SearchAppBar'
import ReactGA from 'react-ga';
import ProjectsDetail from './containers/ProjectsDetail/ProjectsDetail'
import CreateProject from './containers/CreateProject/CreateProject'
import 'typeface-roboto';
import { connect } from 'react-redux'
import * as actionCreators from './store/actions/index'
import LoginPage from './containers/LoginPage/LoginPage'
import Tasks from './containers/Tasks/Tasks'

function PrivateRoute({ component: Component, isAuthenticated: isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <LoginPage {...props} />
        )
      }
      }
    />
  );
}


class App extends React.Component {
  componentDidMount() {
    this.props.auth()
  }

  componentDidUpdate(prevProps) {
    if(this.props.userId) {
      console.log(this.props.userId);
      ReactGA.set({ userId: this.props.userId });
    }
  }

  render() {
    return (
      <>
      <SearchAppBar />
      <Switch>
      <PrivateRoute
        exact
        path="/projects/create"
        component={CreateProject}
        isAuthenticated={this.props.isAuthenticated}
       />
       <PrivateRoute
         exact
         path="/p/:projectId/edit"
         component={CreateProject} />
       <Route
           exact
           path="/p/:projectId/progress"
           component={Tasks} />
        <Route
          exact
          path="/p/:projectId"
          component={ProjectsDetail} />
        <Route render={() => <h1>404 page is yet to be found</h1>} />
      </Switch>
      </>
    );
  }
}

const matchStateToProps = state => {
  return {
    userId: state.aReducer.user ? state.aReducer.user.id : "",
    isAuthenticated: state.aReducer.authenticated
  }
}

const matchDispatchToProps = dispatch => {
  return {
    auth: () => dispatch(actionCreators.auth())
  }
}


export default connect(matchStateToProps, matchDispatchToProps)(App);
