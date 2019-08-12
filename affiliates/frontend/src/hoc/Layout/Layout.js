import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from '../asyncComponent/asyncComponent';

const TutorialList = asyncComponent(() => {
  return import('../../containers/TutorialList/TutorialList');
});

const TutorialDetail = asyncComponent(() => {
  return import('../../containers/TutorialDetail/TutorialDetail');
});


class Layout extends React.Component {
  state = {}
  render() {
    return (
      <>
      <Switch>
        <Route path='/stories/:tutorialId/:slug/:activeStep/:stepSlug' component={TutorialDetail} />
        <Route path='/stories/:tutorialId/:slug/:activeStep' component={TutorialDetail} />
        <Route path='/stories/:tutorialId/:slug/' component={TutorialDetail} />
        <Route path="/stories" exact component={TutorialList} />
      </Switch>
      </>
    )
  }
}

export default Layout
