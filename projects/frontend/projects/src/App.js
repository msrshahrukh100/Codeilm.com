import React from 'react';
import { Route, Switch } from 'react-router-dom'
import SearchAppBar from './containers/SearchAppBar/SearchAppBar'
import ReactGA from 'react-ga';
import 'typeface-roboto';

class App extends React.Component {


  render() {
    // <Route
    // exact
    // path="/c/:communitySlug"
    // component={CommunityPage} />
    return (
      <>
      <SearchAppBar />
      <Switch>
        <Route render={() => <h1>404 page is yet to be found</h1>} />
      </Switch>
      </>
    );
  }
}

export default App;
