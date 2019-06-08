import React from 'react'
import SearchAppBar from '../../components/UI/SearchAppBar/SearchAppBar'
import TutorialList from '../../containers/TutorialList/TutorialList'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponent from '../asyncComponent/asyncComponent';

const RepoList = asyncComponent(() => {
  return import('../../containers/RepoList/RepoList');
});

const LearnEdit = asyncComponent(() => {
  return import('../../containers/LearnEdit/LearnEdit');
});

const TutorialDetail = asyncComponent(() => {
  return import('../../containers/TutorialDetail/TutorialDetail');
});

const LoginPage = asyncComponent(() => {
  return import('../../containers/LoginPage/LoginPage');
});

const TutorialMetrics = asyncComponent(() => {
  return import('../../containers/TutorialMetrics/TutorialMetrics');
});

const CreateTutorial = asyncComponent(() => {
  return import('../../containers/CreateTutorial/CreateTutorial');
});


function PrivateRoute({ component: Component, isAuthenticated: isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        console.log(props);
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

        <Route path='/tutorials/metrics/:tutorialId/:slug' component={TutorialMetrics} />
        <Route path='/tutorials/:tutorialId/:slug/:activeStep/:stepSlug' component={TutorialDetail} />
        <Route path='/tutorials/:tutorialId/:slug/:activeStep' component={TutorialDetail} />
        <Route path='/tutorials/:tutorialId/:slug/' component={TutorialDetail} />

        <PrivateRoute path="/tutorials/create/" component={RepoList} isAuthenticated={this.props.isAuthenticated} />
        <Route path='/tutorials' component={TutorialList} />
        <Route render={() => <h1>404 page is yet to be found</h1>} />
      </Switch>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: localStorage.getItem('token') ? true : false
  }
}

export default connect(mapStateToProps, null)(Layout)
