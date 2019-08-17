import React from 'react';
import { Route, Switch } from 'react-router-dom'
import SearchAppBar from './containers/SearchAppBar/SearchAppBar'
import ReactGA from 'react-ga';
import ProjectsDetail from './containers/ProjectsDetail/ProjectsDetail'
import 'typeface-roboto';

class App extends React.Component {


  render() {
    return (
      <>
      <SearchAppBar />
      <Switch>
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

export default App;
