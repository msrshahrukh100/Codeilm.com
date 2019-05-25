import React from 'react'
import SearchAppBar from '../../components/UI/SearchAppBar/SearchAppBar'
import TutorialList from '../../containers/TutorialList/TutorialList'
import TutorialDetail from '../../containers/TutorialDetail/TutorialDetail'
import { Route, Switch, Redirect } from 'react-router-dom'
import RepoList from '../../containers/RepoList/RepoList'
import LearnEdit from '../../containers/LearnEdit/LearnEdit'
import CreateTutorial from '../../containers/CreateTutorial/CreateTutorial'
import LoginPage from '../../components/LoginPage/LoginPage'
import { connect } from 'react-redux'

function PrivateRoute({ component: Component, isAuthenticated: isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        console.log(props);
        const next= props.match.url
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


class Layout extends React.Component {
  state = {}
  render() {
    return (
      <>
      <SearchAppBar />

      <Switch>
        <Route path='/tutorials/login' component={LoginPage} />
        <PrivateRoute path='/tutorials/create/:repoName/:tutorialId/:tutorialSlug/:branchName' component={LearnEdit} isAuthenticated={this.props.isAuthenticated} />
        <PrivateRoute path='/tutorials/create/:repoName' component={CreateTutorial} isAuthenticated={this.props.isAuthenticated} />

        <Route path='/tutorials/:tutorialId/:slug/:activeStep/:stepSlug' component={TutorialDetail} />
        <Route path='/tutorials/:tutorialId/:slug/:activeStep' component={TutorialDetail} />
        <Route path='/tutorials/:tutorialId/:slug/' component={TutorialDetail} />

        <PrivateRoute path="/tutorials/create/" component={RepoList} isAuthenticated={this.props.isAuthenticated} />
        // <Route path='/tutorials/create/' component={RepoList} />
        <Route path='/tutorials' component={TutorialList} />
        <Route render={() => <h1>404 page is yet to be found</h1>} />
      </Switch>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.aReducer.authToken ? true : false
  }
}

export default connect(mapStateToProps, null)(Layout)
