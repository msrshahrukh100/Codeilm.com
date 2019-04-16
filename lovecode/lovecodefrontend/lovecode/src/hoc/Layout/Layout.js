import React from 'react'
import SearchAppBar from '../../components/UI/SearchAppBar/SearchAppBar'
import TutorialList from '../../containers/TutorialList/TutorialList'
import TutorialDetail from '../../containers/TutorialDetail/TutorialDetail'
import { Route, Switch, Redirect } from 'react-router-dom'
import RepoList from '../../containers/RepoList/RepoList'

class Layout extends React.Component {
  state = {}

  render() {
    return (
      <>
      <SearchAppBar />

      <Switch>
      <Route path='/tutorials/:hash_id/:slug/' component={TutorialDetail} />
      <Route path='/tutorials/create/' component={RepoList} />
       <Route path='/tutorials' component={TutorialList} />
       <Route render={() => <h1>404 page is yet to be found</h1>} />
     </Switch>
      </>
    )
  }
}

export default Layout
